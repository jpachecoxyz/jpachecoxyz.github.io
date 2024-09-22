+++
title = "Wiki"
author = ["Javier Pacheco"]
description = "My personal wiki for some topics."
date = 2024-09-03T15:40:00-05:00
tags = ["wiki", "personal"]
draft = false
toc = true
+++

## Emacs {#emacs}


### Doom Insert item. {#doom-insert-item-dot}

This script wast taken from _doomemacs_, it basically insert a item such a heading, subheading, checkbox, etc. based on the item above.

```emacs-lisp
;;; javier_pacheco utilities.el --- Some useful utilities  -*- lexical-binding: t; -*-
(defun +org--insert-item (direction)
  (let ((context (org-element-lineage
                  (org-element-context)
                  '(table table-row headline inlinetask item plain-list)
                  t)))
    (pcase (org-element-type context)
      ;; Add a new list item (carrying over checkboxes if necessary)
      ((or `item `plain-list)
       (let ((orig-point (point)))
         ;; Position determines where org-insert-todo-heading and `org-insert-item'
         ;; insert the new list item.
         (if (eq direction 'above)
             (org-beginning-of-item)
           (end-of-line))
         (let* ((ctx-item? (eq 'item (org-element-type context)))
                (ctx-cb (org-element-property :contents-begin context))
                ;; Hack to handle edge case where the point is at the
                ;; beginning of the first item
                (beginning-of-list? (and (not ctx-item?)
                                         (= ctx-cb orig-point)))
                (item-context (if beginning-of-list?
                                  (org-element-context)
                                context))
                ;; Horrible hack to handle edge case where the
                ;; line of the bullet is empty
                (ictx-cb (org-element-property :contents-begin item-context))
                (empty? (and (eq direction 'below)
                             ;; in case contents-begin is nil, or contents-begin
                             ;; equals the position end of the line, the item is
                             ;; empty
                             (or (not ictx-cb)
                                 (= ictx-cb
                                    (1+ (point))))))
                (pre-insert-point (point)))
           ;; Insert dummy content, so that `org-insert-item'
           ;; inserts content below this item
           (when empty?
             (insert " "))
           (org-insert-item (org-element-property :checkbox context))
           ;; Remove dummy content
           (when empty?
             (delete-region pre-insert-point (1+ pre-insert-point))))))
      ;; Add a new table row
      ((or `table `table-row)
       (pcase direction
         ('below (save-excursion (org-table-insert-row t))
                 (org-table-next-row))
         ('above (save-excursion (org-shiftmetadown))
                 (+org/table-previous-row))))

      ;; Otherwise, add a new heading, carrying over any todo state, if
      ;; necessary.
      (_
       (let ((level (or (org-current-level) 1)))
         ;; I intentionally avoid `org-insert-heading' and the like because they
         ;; impose unpredictable whitespace rules depending on the cursor
         ;; position. It's simpler to express this command's responsibility at a
         ;; lower level than work around all the quirks in org's API.
         (pcase direction
           (`below
            (let (org-insert-heading-respect-content)
              (goto-char (line-end-position))
              (org-end-of-subtree)
              (insert "\n" (make-string level ?*) " ")))
           (`above
            (org-back-to-heading)
            (insert (make-string level ?*) " ")
            (save-excursion (insert "\n"))))
         (run-hooks 'org-insert-heading-hook)
         (when-let* ((todo-keyword (org-element-property :todo-keyword context))
                     (todo-type    (org-element-property :todo-type context)))
           (org-todo
            (cond ((eq todo-type 'done)
                   ;; Doesn't make sense to create more "DONE" headings
                   (car (+org-get-todo-keywords-for todo-keyword)))
                  (todo-keyword)
                  ('todo)))))))

    (when (org-invisible-p)
      (org-show-hidden-entry))
    (when (and (bound-and-true-p evil-local-mode)
               (not (evil-emacs-state-p)))
      (evil-insert 1))))

;;;###autoload
(defun +org/insert-item-below (count)
  "Inserts a new heading, table cell or item below the current one."
  (interactive "p")
  (dotimes (_ count) (+org--insert-item 'below)))

;;;###autoload
(defun +org/insert-item-above (count)
  "Inserts a new heading, table cell or item above the current one."
  (interactive "p")
  (dotimes (_ count) (+org--insert-item 'above)))


(defun org-make-olist (arg)
  (interactive "P")
  (let ((n (or arg 1)))
    (when (region-active-p)
      (setq n (count-lines (region-beginning)
                           (region-end)))
      (goto-char (region-beginning)))
    (dotimes (i n)
      (beginning-of-line)
      (insert (concat (number-to-string (1+ i)) ". "))
      (forward-line))))
```


### Highlight yanked text {#highlight-yanked-text}

This function describes itself so...

```emacs-lisp
(defun meain/evil-yank-advice (orig-fn beg end &rest args)
  (pulse-momentary-highlight-region beg end 'mode-line-active)
  (apply orig-fn beg end args))
(advice-add 'evil-yank :around 'meain/evil-yank-advice)
```


### Replace '-' with '•'. {#replace-with-dot}

```emacs-lisp
(defun jp/org-font-setup ()
  ;; Replace list hyphen with dot
  (font-lock-add-keywords 'org-mode
                          '(("^ *\\([-]\\) "
                             (0 (prog1 () (compose-region (match-beginning 1) (match-end 1) "•")))))))

(jp/org-font-setup)
```


### Custom_id. {#custom-id-dot}

```elisp
;;;; org-id
(declare-function org-id-add-location "org")
(declare-function org-with-point-at "org")
(declare-function org-entry-get "org")
(declare-function org-id-new "org")
(declare-function org-entry-put "org")

;; Copied from this article (with minor tweaks from my side):
;; https://writequit.org/articles/emacs-org-mode-generate-ids.html.
(defun jp/org--id-get (&optional pom create prefix)
  "Get the CUSTOM_ID property of the entry at point-or-marker POM.
If POM is nil, refer to the entry at point.  If the entry does
not have an CUSTOM_ID, the function returns nil.  However, when
CREATE is non nil, create a CUSTOM_ID if none is present already.
PREFIX will be passed through to `org-id-new'.  In any case, the
CUSTOM_ID of the entry is returned."
  (org-with-point-at pom
    (let ((id (org-entry-get nil "CUSTOM_ID")))
      (cond
       ((and id (stringp id) (string-match \\S- id))
        id)
       (create
        (setq id (org-id-new (concat prefix "h")))
        (org-entry-put pom "CUSTOM_ID" id)
        (org-id-add-location id (format "%s" (buffer-file-name (buffer-base-buffer))))
        id)))))

(declare-function org-map-entries "org")

;;;###autoload
(defun jp/org-id-headlines ()
  "Add missing CUSTOM_ID to all headlines in current file."
  (interactive)
  (org-map-entries
   (lambda () (jp/org--id-get (point) t))))

;;;###autoload
(defun jp/org-id-headline ()
  "Add missing CUSTOM_ID to headline at point."
  (interactive)
  (jp/org--id-get (point) t))
```


### Add ID's to headers - Org roam. {#add-id-s-to-headers-org-roam-dot}

```emacs-lisp
(defun jp/org-id-store-link-for-headers ()
  "Run `org-id-store-link' for each header in the current buffer."
  (interactive)
  (save-excursion
    (goto-char (point-min))
    (while (re-search-forward org-heading-regexp nil t)
      (org-id-store-link))))
```


### Toggle org-emphasis-markers {#toggle-org-emphasis-markers}

```elisp
(defun jp/org-toggle-emphasis-markers (&optional arg)
  "Toggle emphasis markers and display a message."
  (interactive "p")
  (let ((markers org-hide-emphasis-markers)
        (msg ""))
    (when markers
      (setq-local org-hide-emphasis-markers nil)
      (setq msg "Emphasis markers are now visible."))
    (unless markers
      (setq-local org-hide-emphasis-markers t)
      (setq msg "Emphasis markers are now hidden."))
    (message "%s" msg)
    (when arg
      (font-lock-fontify-buffer))))
```


### Insert Org's files to Outlook. {#insert-org-s-files-to-outlook-dot}


#### Export file to clipboard. {#export-file-to-clipboard-dot}

```elisp
(defun export-org-email ()
  "Export the current email org buffer and copy it to the
clipboard"
  (interactive)
  (let ((org-export-show-temporary-export-buffer nil)
        (org-html-head (org-email-html-head)))
    (org-html-export-as-html)
    (with-current-buffer "*Org HTML Export*"
      (kill-new (buffer-string)))
    (message "HTML copied to clipboard")))
(global-set-key (kbd "C-c C-x C-e") 'export-org-email)
```


#### Add some CSS to the file. {#add-some-css-to-the-file-dot}

```elisp
(defun org-email-html-head ()
  "Create the header with CSS for use with email"
  (concat
   "<style type=\"text/css\">\n"
   "<!--/*--><![CDATA[/*><!--*/\n"
   (with-temp-buffer
     (insert-file-contents
      "~/.emacs.d/src/css/org2outlook.css")
     (buffer-string))
   "/*]]>*/-->\n"
   "</style>\n"))
```


### Org TODO auto update. {#org-todo-auto-update-dot}

```emacs-lisp
(defun org-todo-if-needed (state)
  "Change header state to STATE unless the current item is in STATE already."
  (unless (string-equal (org-get-todo-state) state)
    (org-todo state)))

(defun ct/org-summary-todo-cookie (n-done n-not-done)
  "Switch header state to DONE when all subentries are DONE, to TODO when none are DONE, and to DOING otherwise"
  (let (org-log-done org-log-states)   ; turn off logging
    (org-todo-if-needed (cond ((= n-done 0)
                               "TODO")
                              ((= n-not-done 0)
                               "DONE")
                              (t
                               "DOING")))))
(add-hook 'org-after-todo-statistics-hook #'ct/org-summary-todo-cookie)

(defun ct/org-summary-checkbox-cookie ()
  "Switch header state to DONE when all checkboxes are ticked, to TODO when none are ticked, and to DOING otherwise"
  (let (beg end)
    (unless (not (org-get-todo-state))
      (save-excursion
        (org-back-to-heading t)
        (setq beg (point))
        (end-of-line)
        (setq end (point))
        (goto-char beg)
        ;; Regex group 1: %-based cookie
        ;; Regex group 2 and 3: x/y cookie
        (if (re-search-forward "\\[\\([0-9]*%\\)\\]\\|\\[\\([0-9]*\\)/\\([0-9]*\\)\\]"
                               end t)
            (if (match-end 1)
                ;; [xx%] cookie support
                (cond ((equal (match-string 1) "100%")
                       (org-todo-if-needed "DONE"))
                      ((equal (match-string 1) "0%")
                       (org-todo-if-needed "TODO"))
                      (t
                       (org-todo-if-needed "DOING")))
              ;; [x/y] cookie support
              (if (> (match-end 2) (match-beginning 2)) ; = if not empty
                  (cond ((equal (match-string 2) (match-string 3))
                         (org-todo-if-needed "DONE"))
                        ((or (equal (string-trim (match-string 2)) "")
                             (equal (match-string 2) "0"))
                         (org-todo-if-needed "TODO"))
                        (t
                         (org-todo-if-needed "DOING")))
                (org-todo-if-needed "DOING"))))))))
(add-hook 'org-checkbox-statistics-hook #'ct/org-summary-checkbox-cookie)
```


### Org-buffer-scratchpad. {#org-buffer-scratchpad-dot}

```emacs-lisp
(defun new-scratch-pad ()
  "Create a new org-mode buffer for random stuff."
  (interactive)
  (progn
    (let ((buffer (generate-new-buffer "Org-scratch-buffer")))
      (switch-to-buffer buffer)
      (setq buffer-offer-save t)
      (org-mode)
      (olivetti-mode t))))
```


### Toggle buffers. {#toggle-buffers-dot}

```emacs-lisp
;; Toggle *scratch* buffer.
(defun toggle-scratch-buffer ()
  "Toggle the *scratch* buffer"
  (interactive)
  (if (string= (buffer-name) "*scratch*")
      (bury-buffer)
    (switch-to-buffer (get-buffer-create "*scratch*"))))

(defun toggle-org-buffer ()
  "Toggle the Org-scratch-buffer buffer"
  (interactive)
  (if (equal (buffer-name (current-buffer)) "Org-scratch-buffer")
      (if (one-window-p t)
          (switch-to-buffer (other-buffer))
        (delete-window))
    (if (get-buffer "Org-scratch-buffer")
        (if (get-buffer-window "Org-scratch-buffer")
            (progn
              (bury-buffer "Org-scratch-buffer")
              (delete-window (get-buffer-window "Org-scratch-buffer")))
          (switch-to-buffer "Org-scratch-buffer"))
      (new-scratch-pad))))

;; Toggle *eshell* buffer.
(defun toggle-eshell-buffer ()
  "Toggle the *eshell* buffer"
  (interactive)
  (if (string= (buffer-name) "*eshell*")
      (bury-buffer)
    (switch-to-buffer (get-buffer-create "*eshell*"))))
```


### Doc at point. {#doc-at-point-dot}

```emacs-lisp
(defun my-show-doc-or-describe-symbol ()
  "Show LSP UI doc if LSP is active, otherwise describe symbol at point."
  (interactive)
  (if (bound-and-true-p lsp-mode)
      (lsp-ui-doc-glance)
    (describe-symbol-at-point)))
```


### Duplicate &amp; move up/down lines. {#duplicate-and-move-up-down-lines-dot}

```emacs-lisp
(defun duplicate-line ()
  (interactive)
  (let ((line-text (thing-at-point 'line t)))
    (save-excursion
      (move-end-of-line 1)
      (newline)
      (insert line-text)))
  (forward-line 1))

(defun move-line-up ()
  (interactive)
  (when (not (= (line-number-at-pos) 1))
    (transpose-lines 1)
    (forward-line -2)))

(defun move-line-down ()
  (interactive)
  (forward-line 1)
  (when (not (= (line-number-at-pos) (point-max)))
    (transpose-lines 1))
  (forward-line -1))
```


### Hide passwords in org files. {#hide-passwords-in-org-files-dot}

```emacs-lisp
;; Define a custom face for the highlight
(defface my-highlight-face
  '((t (:foreground "gray"))) ; Change "red" to your desired color
  "Face for highlighting !!word!! patterns.")

;; Function to replace matched text with asterisks
(defun replace-with-asterisks (limit)
  "Replace !!word!! with asterisks up to LIMIT."
  (while (re-search-forward "!!\\(.*?\\)!!" limit t)
    (let* ((match (match-string 1))
           (start (match-beginning 0))
           (end (match-end 0))
           (asterisks (make-string (length match) ?*)))
      (add-text-properties start end `(display ,asterisks face my-highlight-face)))))

;; Add custom keyword for font-lock in org-mode
(defun my/org-mode-custom-font-lock ()
  "Add custom font-lock keywords for org-mode."
  (font-lock-add-keywords nil
                          '((replace-with-asterisks))))

;; Hook the custom font-lock configuration into org-mode
(add-hook 'org-mode-hook 'my/org-mode-custom-font-lock)
```


### Help at point. {#help-at-point-dot}

```emacs-lisp
(defun describe-symbol-at-point ()
  "Display the documentation of the symbol at point, if it exists."
  (interactive)
  (let ((symbol (symbol-at-point)))
    (if symbol
        (cond
         ((fboundp symbol) (describe-function symbol))
         ((boundp symbol) (describe-variable symbol))
         (t (message "No documentation found for symbol at point: %s" symbol)))
      (message "No symbol at point"))))
```


### fz-themes {#fz-themes}

```emacs-lisp
(defun custom-jp-themes (&optional theme-dir)

  (defun custom-jp-themes (&optional theme-dir)
    "Return a list of custom themes from a specified directory.
Search the directory for files named FOO-theme.el, and return a list of FOO symbols,
excluding the 'default' theme and any internal themes.

If THEME-DIR is nil, it defaults to `~/.emacs.d/lisp/jp-themes/'."
    (let ((suffix "-theme\\.el\\'")
          (directory (or theme-dir "~/.emacs.d/lisp/jp-themes/"))
          themes)
      ;; Ensure the directory exists
      (when (file-directory-p directory)
        ;; Iterate over all theme files in the directory
        (dolist (file (directory-files directory nil suffix))
          (let ((theme (intern (substring file 0 (string-match-p suffix file)))))
            ;; Add to the list if it's valid, and exclude Emacs built-in "default" theme
            (and (not (eq theme 'default))  ;; Ensure "default" is excluded
               (not (memq theme themes))  ;; Avoid duplicates
               (push theme themes)))))
      (nreverse themes)))

  (defcustom fz-themes nil
    "List of themes (symbols or regexps) to be presented for selection.
nil shows all `custom-available-themes'."
    :type '(repeat (choice symbol regexp)))

  (defun fz-theme (theme)
    "Disable current themes and enable THEME from `fz-themes`.

The command supports previewing the currently selected theme."
    (interactive
     (list
      (let* ((regexp (consult--regexp-filter
                      (mapcar (lambda (x) (if (stringp x) x (format "\\`%s\\'" x)))
                              fz-themes)))
             (avail-themes (seq-filter
                            (lambda (x) (string-match-p regexp (symbol-name x)))
                            (custom-jp-themes)))  ;; Only use themes from custom-jp-themes
             (saved-theme (car custom-enabled-themes)))
        (consult--read
         (mapcar #'symbol-name avail-themes)
         :prompt "Theme: "
         :require-match t
         :category 'theme
         :history 'consult--theme-history
         :lookup (lambda (selected &rest _)
                   (setq selected (and selected (intern-soft selected)))
                   (or (and selected (car (memq selected avail-themes)))
                      saved-theme))
         :state (lambda (action theme)
                  (pcase action
                    ('return (fz-theme (or theme saved-theme)))
                    ((and 'preview (guard theme)) (fz-theme theme))))
         :default (symbol-name (or saved-theme 'default))))))
    (when (eq theme 'default) (setq theme nil))
    (unless (eq theme (car custom-enabled-themes))
      (mapc #'disable-theme custom-enabled-themes)
      (when theme
        (if (custom-theme-p theme)
            (enable-theme theme)
          (load-theme theme :no-confirm)))))
```


### Custom functions. {#custom-functions-dot}

```emacs-lisp
;; Open files in the lisp folder
(require 'find-lisp)
(defun open-lisp-and-org-files ()
  "Open a Lisp or Org file from ~/.emacs.d/lisp directory, including subfolders."
  (interactive)
  (let* ((directory "~/.emacs.d/lisp")
         (el-files (find-lisp-find-files directory ".*\\.el$"))
         (org-files (find-lisp-find-files directory ".*\\.org$"))
         (all-files (append el-files org-files))
         (file (completing-read "Select file: " all-files nil t)))
    (find-file file)))

;; Follow urls in the buffer
(defun list-and-open-url-in-buffer ()
  "List all URLs in the current buffer, display them in the minibuffer, and open a selected URL in the browser."
  (interactive)
  (let (urls)
    (save-excursion
      (goto-char (point-min))
      (while (re-search-forward "\\(http\\|https\\|ftp\\|file\\|mailto\\):[^ \t\n]+" nil t)
        (push (match-string 0) urls)))
    (if urls
        (let ((url (completing-read "Select URL to open: " (reverse urls) nil t)))
          (browse-url url))
      (message "No URLs found in the buffer."))))

;; Export org files to pdf using tectonic
(defun org-export-to-latex-and-compile-with-tectonic ()
  "Export the current Org file to LaTeX, then compile with tectonic using shell-escape."
  (interactive)
  (let* ((org-file (buffer-file-name))
         (tex-file (concat (file-name-sans-extension org-file) ".tex"))
         (tectonic-command (concat "tectonic -Z shell-escape " tex-file)))
    ;; Export Org file to LaTeX
    (org-latex-export-to-latex)
    ;; Run tectonic command in a temporary buffer to avoid displaying the output
    (with-temp-buffer
      (shell-command tectonic-command (current-buffer)))
    (message "Compiled %s to PDF with Tectonic." tex-file)))

(global-set-key (kbd "C-c e l") 'org-export-to-latex-and-compile-with-tectonic)

;; Update my web-page
(defun publish-my-blog ()
  "Export all subtrees with Hugo, then run the publish blog script within Emacs and display a success message in the minibuffer."
  (interactive)
  (let ((commit-msg (read-string "Enter commit message: ")))
    ;; Export all subtrees with Hugo
    (org-hugo-export-wim-to-md :all-subtrees)
    ;; Run the publish script
    (let ((process (start-process-shell-command
                    "publish-blog"                       ; Process name
                    "*publish-blog-output*"              ; Output buffer
                    (format "~/webdev/jpachecoxyz.github.io/hugo/publish.sh \"%s\"" commit-msg))))  ; Run the script with the commit message
      ;; Set up the process sentinel to check the process status
      (set-process-sentinel
       process
       (lambda (process event)
         (when (string= event "finished\n")
           (message "jpacheco.xyz was correctly updated!")))))))

(global-set-key (kbd "C-c u b") 'publish-my-blog)

;; Search roam
(defun jp/search-roam ()
  "Run consult-ripgrep on the org roam directory"
  (interactive)
  (consult-ripgrep org-roam-directory nil))
(global-set-key (kbd "C-c n s") 'jp/search-roam)

(defun jp/yt-shorts-timer ()
  (interactive)
  (org-timer-set-timer "55s"))
(global-set-key (kbd "<f4>") 'jp/yt-shorts-timer)
```


## Linux {#linux}


## Python {#python}


### Avoid SSL verification when installing packages through pip. {#avoid-ssl-verification-when-installing-packages-through-pip-dot}

I have some issues with the firewall in one of my jobs, so in order to be able to install python packages through pip we need to skip the `SSL` verification with the following flags.

```shell
pip install --no-cache-dir --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org <program>
```


## Robots {#robots}


## Windows {#windows}


### Change IP address within terminal. {#change-ip-address-within-terminal-dot}

This cmd script prompt for an IP to b changed in the computer. Must run as root/administrator.

```bat
@echo off
setlocal

rem Prompt the user for new IP address
set /p newIP="Enter the new IP address: "
set "newSubnetMask=255.255.255.0"

rem Set the new IP address while keeping existing subnet mask and gateway
netsh interface ipv4 set address name="Ethernet" static %newIP% %newSubnetMask%

rem Display the new IP configuration

if %errorlevel% equ 0 (
    echo IP address changed successfully.
) else (
    echo Failed to change IP address. Please make sure you have administrative privileges.
)

endlocal
```

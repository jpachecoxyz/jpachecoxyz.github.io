;; .dir-locals.el
((nil . ((org-hugo-base-dir . "~/webdev/jpachecoxyz/")))
 ("org/"
  . ((org-mode
      . ((eval . (progn
                   (setq-local org-hugo-base-dir "~/webdev/jpachecoxyz/")
                   (org-hugo-auto-export-mode 1))))))))

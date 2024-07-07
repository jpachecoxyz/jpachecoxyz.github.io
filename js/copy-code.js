(function() {
    'use strict';
  
    if(!document.queryCommandSupported('copy')) {
        return;
    }
  
    function flashCopyMessage(el, msg) {
        if (msg === 'Copied!') {
            el.innerHTML = '<i class="fa fa-check"></i>'; // Checkmark icon
        } else {
            el.innerHTML = '<i class="fa fa-clipboard"></i>'; // Clipboard icon
        }
        setTimeout(function() {
            el.innerHTML = '<i class="fa fa-clipboard"></i>'; // Revert back to clipboard icon
        }, 1000);
    }
  
    function selectText(node) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    }
  
    function addCopyButton(containerEl) {
        var copyBtn = document.createElement("button");
        copyBtn.className = "highlight-copy-btn";
        copyBtn.innerHTML = '<i class="fa fa-clipboard"></i>'; // Clipboard icon
  
        var codeEl = containerEl.firstElementChild;
        copyBtn.addEventListener('click', function() {
            try {
                var selection = selectText(codeEl);
                document.execCommand('copy');
                selection.removeAllRanges();
  
                flashCopyMessage(copyBtn, 'Copied!');
            } catch(e) {
                console && console.log(e);
                flashCopyMessage(copyBtn, 'Failed :\'(');
            }
        });
  
        containerEl.appendChild(copyBtn);
    }
  
    // Add copy button to code blocks
    var highlightBlocks = document.getElementsByClassName('highlight');
    Array.prototype.forEach.call(highlightBlocks, addCopyButton);
})();

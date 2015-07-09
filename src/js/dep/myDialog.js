/*
Description: $.dialog
Author: Zhang Zengwei
Require: string.format.js
*/
(function($) {
    $.dialog = function(options, dialogNM) {
        // var randomNum = function (n){ 
        //     var t=''; 
        //     for(var i=0;i<n;i++){ 
        //         t+=Math.floor(Math.random()*10); 
        //     } 
        //     return t; 
        // }
        var dialogName = dialogNM || options.name; // || "myDialog" + randomNum(2);
        if (typeof options == "object") {
            var dialogTitle = options.title || "Demo",
                dialogId = options.id || "",
                dialogUnit = options.unit || "px",
                dialogWidth = options.width || ((options.unit == undefined || options.unit == "px") ? 560 : 40),
                dialogHeight = options.height || ((options.unit == undefined || options.unit == "px") ? 200 : 100),
                dialogContentSouce = options.contentSource || "js",
                dialogContent = options.content || "<div>No Content!</div>",
                // dialogContentClass = options.content.attr("class") || "",
                dialogClassed = options.classed || "",
                dialogButtons = options.buttons || [
                    {
                        text: "关闭",
                        id:   "defaultClose",
                        classed: "btn-default",
                        click: function() {
                            // if (dialogContentSouce === "html") {
                            //     console.log(dialogContentClass);
                            //     $("body div." + dialogContentClass + "-div").append(dialogContent);
                            // }
                            $("div[name='" + dialogName + "']").modal("hide");                        
                        }
                    }
                ]
            var $body = $(document.body),
                $dialog;
            var addDialogButton = function () {
                var $btnrow = $dialog.find(".modal-footer");
                $btnrow.html('');
                // console.log(dialogButtons);
                dialogButtons.forEach(function (button) {
                    var btnId = button.id || "",
                        btnText = button.text || "", 
                        btnClassed = button.classed || "btn btn-default", 
                        btnValidate = button.validate ? $dialog.find("form").attr("name") + ".$invalid" : false,
                        btnClick   = button.click || function() {
                                                        // if (dialogContentSouce === "html") {
                                                        //     console.log(dialogContentClass);
                                                        //     $("body div." + dialogContentClass + "-div").append(dialogContent);
                                                        // }
                                                        $("div[name='" + dialogName + "']").modal("hide");                        
                                                     };
                    $button = $('<button id="{2}" type="button" class="{1}" ng-disabled="{3}">{0}</button>'.format(btnText, btnClassed, btnId, btnValidate));
                    if (btnClick) {
                        (function(btnClick) {
                            $button.click(function() {
                                btnClick.call(self);
                            });
                        })(btnClick);
                    }
                    $btnrow.append($button);
                });
            };
            var createDialog = function () {
                if ($("div[name='" + dialogName + "']").length > 0) {
                    $("div[name='" + dialogName + "']").modal({backdrop: 'static', keyboard: false});
                    $("div[name='" + dialogName + "']").modal("show");
                    // $("body div.modal").remove();
                } else {
                    // $("body div.modal").remove();
                    var dialogStyle = "width:" + dialogWidth + dialogUnit + ";";
                    if (dialogUnit == "px") {
                        if (dialogWidth > 560) {
                            dialogStyle += "margin-left:-" + (dialogWidth)/2 + "px";
                        }
                    } else {
                        dialogStyle += "margin-left:50%; margin-left:-" + dialogWidth/2 + "%";
                    }
                    var dialogHtml = ''    
                        + '<div id="' + dialogId + '" name="' + dialogName + '" class="modal fade in ' + dialogClassed + '" style="' + dialogStyle + '">'
                        +   '<div class="modal-dialog">'
                        +       '<div class="modal-content">'
                        +           '<div class="modal-header">'
                        +               '<button type="button" class="close">×</button>'
                        +               '<h4 class="modal-title">' + dialogTitle + '</h4>'
                        +           '</div>'
                        +           '<div class="modal-body" style="height:' + dialogHeight + dialogUnit + '"> </div>'
                        +           '<div class="modal-footer"></div>'
                        +       '</div>'
                        +   '</div>'
                        + '</div>'; 
                    $dialog = $(dialogHtml);  
                    $("div.modal-body", $dialog).append(dialogContent);        
                    addDialogButton();
                    $(document.body).append($dialog);
                    // $(document.body).wrapInner($dialog);
                    $("div[name='" + dialogName + "']").modal({backdrop: 'static', keyboard: false});
                    $("div[name='" + dialogName + "']").modal("show");

                    $("div[name='" + dialogName + "'] div.modal-header button.close").on("click", function () {
                        $("div[name='" + dialogName + "']").modal("hide");
                    });
                }
            }
            createDialog();
            // if (dialogContentSouce === "html") {
            //     console.log(dialogContentClass);
            //     $("body div." + dialogContentClass + "-div").append(dialogContent);
            // }
        } else {
            if (options == "hide") {
                // if (dialogContentSouce === "html") {
                //     console.log(dialogContentClass);
                //     $("body div." + dialogContentClass + "-div").append(dialogContent);
                // }
                $("div[name='" + dialogName + "']").modal("hide");
                return;
            }
            if (options == "show") {
                $("div[name='" + dialogName + "']").modal({backdrop: 'static', keyboard: false});
                $("div[name='" + dialogName + "']").modal("show");
                return;
            }
        }    
    };
})(jQuery);
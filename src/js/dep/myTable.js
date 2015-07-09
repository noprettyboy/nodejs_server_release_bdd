/*
Description: $.table
Author: Zhang Zengwei
Require: string.format.js
*/
(function($) {
    $.table = function(options) {
        var tableName = options.name,
            tableLocation = options.location,
            tableCaption = options.caption || '',
            tableUnit = options.unit || 'px',
            tableWidth = options.width || ((options.unit == undefined || options.unit == 'px') ? 560 : 100),
            // tableHeight = options.height || ((options.unit == undefined || options.unit == 'px') ? 200 : 100),
            tableLineHeight = options.lineHeight || 30,
            tableClassed = options.classed || '',
            tableAlign = options.style != undefined ? (options.style.align || 'center') : 'center',
            tableTheadTrBgColor = options.style != undefined ? (options.style.theadTrBgColor || '#d9edf7') : '#d9edf7',
            tableTheadTrHoverBgColor = options.style != undefined ? (options.style.theadTrHoverBgColor || '#B4CDCD') : '#B4CDCD',
            tableCaptionStyle = options.style != undefined ? (options.style.caption || 'font-weight: bold; font-size: 15px;') : 'font-weight: bold; font-size: 15px;',
            // tableOddTbodyTrStyle = options.style != undefined ? (options.style.tbodyOddTr || 'background-color:white;') : 'background-color:white;',
            // tableEvenTbodyTrStyle = options.style != undefined ? (options.style.tbodyEvenTr || 'background-color:#f5f5f5;') : 'background-color:#f5f5f5;',
            tableColumn = options.columns,
            tableDataName = options.dataName,
            tableDataCount = options.dataCount,
            tableNullDataStr = options.nullDataStr || 'No Data!';

        var curTableHeight = tableLineHeight*2+4;

        var createTable = function () {
            var tableHtml = ''
                +   '<table name="' + tableName + '" class="' + tableClassed + '" style="width:' + tableWidth + tableUnit + ';">'
                +       '<caption style="' + tableCaptionStyle + '">' + tableCaption + '</caption>'
                +       '<thead>'
                +           '<tr style="background-color:' + tableTheadTrBgColor + '; line-height:' + tableLineHeight + 'px; border:solid 1px #ddd;">'
                +           '</tr>'
                +       '</thead>'
                +       '<tbody>'
                +           '<tr style="line-height:' + tableLineHeight + 'px; border:solid 1px #ddd;" OEFlag="{{($index+1)%2}}" ng-repeat="columnItem in ' + tableDataName + '">'
                +           '</tr>'
                +           '<tr style="line-height:' + tableLineHeight + 'px; border:solid 1px #ddd;" ng-show="{{!' + tableDataName + '.length}}">'
                +               '<td style="text-align:' + tableAlign + ';" colspan=' + tableColumn.length + '>' + tableNullDataStr + '</td>'
                +           '</tr>'
                +       '</tbody>'
                +   '</table>'
                +   '<div name="dragLine" style="z-index:200;position:absolute;height:32px; display:none;">'
                +       '<div class="drag-outter" style="position:relative;width:20px;cursor:e-resize;z-index:200;">'
                +           '<div class="drag-inner" style="position:relative;cursor:e-resize;margin-left:5px;width:15px; height:' + curTableHeight + 'px;"></div>'
                +       '</div>'
                +   '</div>';
            $table = $(tableHtml);
            var tableTheadHtml = '';
            var tableTbodyHtml = '';
            $.each(tableColumn, function (index, item) {
                if (index+1 == 1) {
                    if (item.type == 'ck') {
                        tableTheadHtml += '<th colIndex="' + index + '" width="' + item.width + tableUnit + '" style="text-align:center; border-left:dotted 1px #CCCCCC;">'
                        +   '<div class="content-div" style="overflow:hidden; height:' + tableLineHeight + 'px; line-height:' + tableLineHeight + 'px; float:left; '
                        +   'cursor: default; margin-left:-2px; width:98%;">'
                        +   '<input type="checkbox" class="select-all" style="margin-top: 0px !important;" />' + item.name + '</div>'
                        +   '<div class="resize-div" style="float:right; cursor:e-resize; width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;">'
                        +   '<div style="word-break: break-all; word-wrap:break-word; height:' + tableLineHeight + 'px; line-height:' + tableLineHeight + 'px; width:98%;">'
                        +       '<input type="checkbox" class="batch-deal" value="{{columnItem.id}}" style="margin-top: 0px !important;" />'
                        +   '</div></td>';
                    } else if (item.type == 'text') {
                        tableTheadHtml += '<th colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left; cursor: default; '
                        +   'margin-left:-2px; width:98%;">' + item.name+ '</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">{{columnItem.' + item.field + '}}</div></td>';
                    } else if (item.type == 'html') {
                        tableTheadHtml += '<th colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left; cursor: default; '
                        +   'margin-left:-2px; width:98%;">' + item.name+ '</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">' + item.html + '</div>'
                        +   '<div style="width:200px;height:300px;overflow-y:scroll;">zzwssssssss</div></td>';
                    } else if (item.type == 'dynamic') {
                        tableTheadHtml += '<th ng-repeat="headItem in ' + item.field + ' track by $index" colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" '
                        +   'width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left; cursor: default; '
                        +   'margin-left:-2px; width:98%;">{{headItem}}</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td ng-repeat="tdItem in columnItem.row track by $index" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">{{tdItem}}</div></td>';
                    }
                } else if (index+1 == tableColumn.length) {
                    if (item.type == 'ck') {
                        tableTheadHtml += '<th colIndex="' + index + '" width="' + item.width + tableUnit + '" style="text-align:center; border-left:dotted 1px #CCCCCC;">'
                        +   '<div style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;cursor:default; margin-left:-2px;">'
                        +   '<input type="checkbox" />' 
                        +   item.name + '</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;">'
                        +   '<div style="word-break: break-all; word-wrap:break-word;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;"><input type="checkbox"'
                        +   'value="{{columnItem.id}}" /></div></td>';
                    } else if (item.type == 'text') {
                        tableTheadHtml += '<th colIndex="' + index + '" width="' + item.width + tableUnit + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;">'
                        +   '<div style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;cursor:default; margin-left:-2px;">' + item.name+ '</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;">{{columnItem.' + item.field + '}}</div></td>';
                    } else if (item.type == 'html') {
                        tableTheadHtml += '<th colIndex="' + index + '" width="' + item.width + tableUnit + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;">'
                        +   '<div style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;cursor:default; margin-left:-2px;">' + item.name+ '</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;">' + item.html + '</div></td>';
                    } else if (item.type == 'dynamic') {
                        tableTheadHtml += '<th ng-repeat="headItem in ' + item.field + ' track by $index" colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" '
                        +   'width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left; cursor: default; '
                        +   'margin-left:-2px; width:98%;">{{headItem}}</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td ng-repeat="tdItem in columnItem.row track by $index" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">{{tdItem}}</div></td>';
                    }
                } else {
                    if (item.type == 'ck') {
                        tableTheadHtml += '<th colIndex="' + index + '" width="' + item.width + tableUnit + '" style="text-align:center; border-left:dotted 1px #CCCCCC;">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left;cursor: default; margin-left:-2px; width:98%;">'
                        +   '<input type="checkbox" style="margin-top: 0px !important;" />' + item.name + '</div>'
                        +   '<div class="resize-div" style="cursor:e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;">'
                        +   '<div style="word-break: break-all; word-wrap:break-word;line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">'
                        +   '<input type="checkbox" value="{{columnItem.id}}" style="margin-top: 0px !important;" /></div></td>';
                    } else if (item.type == 'text') {
                        tableTheadHtml += '<th colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left;cursor: default; '
                        +   'margin-left:-2px; width:98%;">' + item.name+ '</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">{{columnItem.' + item.field + '}}</div></td>';
                    } else if (item.type == 'html') {
                        tableTheadHtml += '<th colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left;cursor: default;'
                        +   'margin-left:-2px; width:98%;">' + item.name+ '</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        if (item.pop) {
                            tableTbodyHtml += '<td style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;">'
                            +   '<div data-toggle="popover" title="" data-content="' + item.html + '" style="word-break: break-all; word-wrap:break-word;'
                            +   'line-height:' + tableLineHeight + 'px;line-height:' 
                            +   tableLineHeight + 'px;width:98%;">{{columnItem.' + item.field + '}}</div>'
                            +   '</td>';
                        } else {
                            tableTbodyHtml += '<td ng-value="{{' + item.tip + '==true ? true : false}}" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                            +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">' + item.html + '</div>'
                            +   '<div class="myTip" style="position:relative;"><div ng-show="{{' + item.tip + '==true ? true : false}}" style="width:250%;height:270px;overflow-y:auto;'
                            +   'position:absolute;left:26%;top:-220px;z-index:50;background-color:#FFFFF0;border:solid 1px #0b0719;text-align:left;word-break:break-all;word-wrap:break-word;padding:5px 5px 5px 5px;'
                            +   'line-height20px;border-radius:15px;display:none;">'
                            +   '{{columnItem.' + item.field + '}}</div></div></td>';
                        }
                    } else if (item.type == 'dynamic') {
                        tableTheadHtml += '<th ng-repeat="headItem in ' + item.field + ' track by $index" colIndex="' + index + '" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;" '
                        +   'width="' + item.width + tableUnit + '">'
                        +   '<div class="content-div" style="overflow:hidden;height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;float:left; cursor: default; '
                        +   'margin-left:-2px; width:98%;">{{headItem}}</div>'
                        +   '<div class="resize-div" style="cursor: e-resize;float:right;width:2%;">&nbsp;</div></th>';
                        tableTbodyHtml += '<td ng-repeat="tdItem in columnItem.row track by $index" style="text-align:' + tableAlign + '; border-left:dotted 1px #CCCCCC;"><div style="word-break: break-all; word-wrap:break-word;'
                        +   'line-height:' + tableLineHeight + 'px;line-height:' + tableLineHeight + 'px;width:98%;">{{tdItem}}</div></td>';
                    }
                }
            });
            $('thead tr', $table).html(tableTheadHtml);
            $('tbody tr:first-child', $table).html(tableTbodyHtml);
            $(tableLocation).html($table);
        }
        createTable();

        var curTableLeft = $('table[name=' + tableName + ']')[0].offsetLeft;
        var curColIndex = 0;
        var nextColIndex = 1;
        var curPageX = 0;
        $('table[name=' + tableName + '] thead tr th div.resize-div').on('mouseover', function (event) {
            $('div[name=dragLine] div.drag-outter div.drag-inner').css('border-left','solid 0px #67c2ef');
            curColIndex = $(this).parent().attr("colIndex");
            if (curColIndex > 0) {
                nextColIndex = parseInt(curColIndex) + 1;
            }
            curPageX = event.pageX;

            $('div[name=dragLine]').css('display','block');
            $('div[name=dragLine] div.drag-outter').css('left',event.pageX-curTableLeft-10);

            curTableHeight = $(tableLocation)[0].offsetHeight;
            if (tableCaption) {
                curTableHeight -= 23;
            }
            $(tableLocation + ' div[name=dragLine] div.drag-outter div.drag-inner').css('height', curTableHeight + 'px');
            $(tableLocation + ' div[name=dragLine] div.drag-outter').css('margin-top', '-' + curTableHeight + 'px');

            $('div[name=dragLine]').unbind('mousemove');
            $('div[name=dragLine] div.drag-outter').on('mouseout', function () {
                $('div[name=dragLine]').css('display','none');
            });
        });

        $('div[name=dragLine] div.drag-outter div.drag-inner').on('mousedown', function (event) {
            $('div[name=dragLine] div.drag-outter div.drag-inner').css('border-left','solid 1px #67c2ef');
            $('table[name=' + tableName + '] thead tr th[colIndex=' + curColIndex + ']').css('background-color', tableTheadTrHoverBgColor);
            var o = this;
            if(o.setCapture) 
                o.setCapture(); 
            else if(window.captureEvents) 
                window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
            $('div[name=dragLine]').on('mousemove', function (event) {
                $('div[name=dragLine]').css('display','block');
                $('div[name=dragLine] div.drag-outter').css('left',event.pageX-curTableLeft-10);
            });
        });
        $('div[name=dragLine]').on('mouseup', function (event) {
            $('table[name=' + tableName + '] thead tr th[colIndex=' + curColIndex + ']').css('background-color', tableTheadTrBgColor);
            var curPostionX = event.pageX-curPageX;
            
            $('div[name=dragLine]').css('display','none');
            $('div[name=dragLine] div.drag-outter').css('left',0);

            var curWidth = 0;
            var nextWidth = 1;
            if (curPostionX > 0) {
                curWidth = parseInt($('table[name=' + tableName + '] thead tr th[colIndex=' + curColIndex + ']').width())+curPostionX;
                nextWidth = parseInt($('table[name=' + tableName + '] thead tr th[colIndex=' + nextColIndex + ']').width())-curPostionX;
                $('table[name=' + tableName + '] thead tr th[colIndex=' + nextColIndex + ']').attr('width', nextWidth+'px');
                $('table[name=' + tableName + '] thead tr th[colIndex=' + curColIndex + ']').attr('width', curWidth+'px');
            } else {
                curWidth = parseInt($('table[name=' + tableName + '] thead tr th[colIndex=' + curColIndex + ']').width())+curPostionX;
                nextWidth = parseInt($('table[name=' + tableName + '] thead tr th[colIndex=' + nextColIndex + ']').width())-curPostionX;
                $('table[name=' + tableName + '] thead tr th[colIndex=' + curColIndex + ']').attr('width', curWidth+'px');
                $('table[name=' + tableName + '] thead tr th[colIndex=' + nextColIndex + ']').attr('width', nextWidth+'px');
            }
        });
        $('table[name=' + tableName + '] thead tr th input.select-all').on('click', function (event) {
            $('table[name=' + tableName + '] tbody tr td input.batch-deal').trigger('click');
        });
    };
})(jQuery);
/*
 * mindmap
 * https://github.com/Chaptykov/mindmap
 *
 * Copyright (c) 2013 Chaptykov
 * Licensed under the MIT license.
 */

(function ($) {

    var params;

    var methods = {
        init: function (options) {
            var self = $(this);

            params = $.extend({
                nodeClass: 'node',
                nodeTextClass: 'node__text',
                activeClass: 'node_active',
                rootClass: 'node_root',
                childrenClass: 'children',
                childrenItemClass: 'children__item',
                leftBranch: 'children_leftbranch',

                // Settings
                root: self,
                balance: false

            }, options);

            params.nodes = self.find('.' + params.nodeClass);
            params.nodeInput = self.find('.' + params.nodeInputClass);

            if (self.find(params.activeClass).length) {
                params.activeNode = self.find(params.activeClass);
            }
            else {
                params.activeNode = null;
            }

            self
                .on('click', '.' + params.nodeClass, function () {
                    var self = $(this);

                    if (!self.hasClass(params.activeClass)) {
                        methods.setActive(self);
                    }
                    else {
                        methods.setActive(self);
                    }
                });
            $('body').on('click',function(){
                methods.hideMenu();
            });
        },

        removeNode: function () {
            methods.hideMenu();
            var node = params.activeNode,
                nodeBranch = node.parent(),
                parentBranch = nodeBranch.parent(),
                len = parentBranch.children().length - 1;
            if (!len) {
                parentBranch.remove();
            }
            else {
                nodeBranch.remove();
            }
            return true;
        },

        addChildNode: function () {
            methods.hideMenu();
            var nodeBranch = params.activeNode.parent(),
                nodeChildren = nodeBranch.children('.' + params.childrenClass),
                nodeChildrenItem,
                newNode,
                activeNodeId = params.activeNode.attr('node-id');
            //如果父节点为新增的未保存的阶段，则不允许新增子节点
            if (typeof(activeNodeId) == "undefined") {
                showError('请先编辑保存该节点，然后再为其添加子节点');
                return false;
            }
            if (nodeChildren.length) {
                if (params.activeNode.hasClass(params.rootClass) && nodeChildren.length === 2) {
                    nodeChildren = nodeChildren.filter('.' + params.leftBranch);
                }

                nodeChildren.append(methods.getTemplate(1));
                nodeChildrenItem = nodeChildren.children('.' + params.childrenItemClass + ':last');
                newNode = nodeChildrenItem.children('.' + params.nodeClass);
            }
            else {
                nodeBranch.append(methods.getTemplate(1, 1));
                nodeChildren = nodeBranch.children('.' + params.childrenClass);
                nodeChildrenItem = nodeChildren.children('.' + params.childrenItemClass + ':last');
                newNode = nodeChildrenItem.children('.' + params.nodeClass);

            }
            //给新增的节点绑定右击事件
            newNode.on('mouseup', function () {
                addOptEvent(newNode, event)
            });
        },

        setActive: function (node) {
            $('.node').removeClass(params.activeClass);
            node.addClass(params.activeClass);
            params.activeNode = node;
        },

        getTemplate: function (withNode, withWrap) {
            var template = '';

            template += withWrap ? ' <ol class="' + params.childrenClass + '">' : '';
            template += withNode ? '<li class="' + params.childrenItemClass + '"><div class="' + params.nodeClass + '"><div id="1" class="' + params.nodeTextClass + '">Node</div></div></li> ' : '';
            template += withWrap ? '</ol>' : '';

            return template;
        },
        showMenu: function (node, event) {
            methods.setActive(node);
            if (event.which == 3) {
                var top = event.pageY || event.clientY + document.body.scroolTop;
                var left = event.pageX || event.clientX + document.body.scroolLeft;
                $('#tree-menu').css({'top': top, 'left': left+10}).show();
            }
        },

        hideMenu: function () {
            $('#tree-menu').hide();
        },

        hasChild: function (node) {
            if (node.next('.' + params.childrenClass).length >= 1) {
                return true;
            }
            return false;
        },

        //获取父节点的ID
        getParentNodeId: function () {
            var parentNode = params.activeNode.closest('ol').prev('.' + params.nodeClass);
            // console.info(parentNode.attr('node-id'));
            return parentNode.attr('node-id');
        },

        hideChild: function(node){
            children = node.next('ol');
            if (children.is(":hidden")) {
                children.show();
            } else {
                children.hide();
            }
        }

    };

    $.fn.mindmap = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Unknown method: ' + method);
        }

    };
}(jQuery));

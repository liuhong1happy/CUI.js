"use strict";

var CUI = CUI || {};

(function(exports) {

    var Class = exports.Class;
    var Utils = exports.Utils;
    var noop = exports.noop;

    var Cursor = Class.create({

        initialize: function() {
            this.lazyInit = false;
            this.hoverButton = null;
            this.hoverId = 0;
            this.defaultHoverId = 0;

            this.cyclic = true;
            this.disabled = true;

            this.color = "#FF7F00";
            this.ui = null;
            this.navTree = null;
        },

        init: function() {
            if (this.defaultHoverId) {
                this.setHoverButton(this.defaultHoverId);
            }
            if (this.onInit) {
                this.onInit();
            }
        },
        onInit: null,

        enable: function() {
            this.disabled = false;
        },
        disable: function() {
            this.disabled = true;
        },
        reset: function() {
            this.lastHoverButton = null;
            this.lastHoverId = null;
            this.hoverButton = null;
            this.hoverId = null;
        },

        tap: function() {
            var btn = this.hoverButton;
            if (!btn || btn.disabled) {
                return false;
            }
            var id = 123;
            var x = btn.x + 1,
                y = btn.y + 1;
            btn.touchStart(x, y, id);
            setTimeout(function() {
                btn.touchEnd(x, y, id);
                btn.tap(x, y, id);
            }, 100);
            return true;
        },
        nav: function(flag) {
            var btn = this.hoverButton;
            if (!btn || !this.navTree) {
                return false;
            }
            var btnNav = this.navTree[btn.id];
            if (btnNav && btnNav[flag]) {
                var id = btnNav[flag];
                if (id === -1) {
                    id = this.lastHoverId;
                }
                this.setHoverButton(id);
            }
        },
        back: function() {
            this.setHoverButton(this.lastHoverId);
        },

        up: function() {
            this.nav(0);
        },
        right: function() {
            this.nav(1);
        },
        down: function() {
            this.nav(2);
        },
        left: function() {
            this.nav(3);
        },

        hoverDefault: function() {
            this.setHoverButton(this.defaultHoverId);
        },
        setHoverButton: function(id) {
            var btn = this.ui.all[id];
            if (!btn) {
                return false;
            }
            this.lastHoverButton = this.hoverButton;
            this.lastHoverId = this.hoverId;
            this.onUnhover(this.hoverButton);

            this.hoverButton = btn;
            this.hoverId = id;
            this.onHover(btn);
            return true;
        },
        onHover: function(btn) {

        },
        onUnhover: function(btn) {

        },
        render: function(renderer, timeStep, now) {
            var btn = this.hoverButton;
            if (!btn) {
                return;
            }
            var lineWidth = 4;
            renderer.strokeRect(btn.x - 4, btn.y - 4, btn.w + 8, btn.h + 8, lineWidth, this.color);
        },

    });

    exports.Cursor = Cursor;

}(CUI));

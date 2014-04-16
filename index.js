'use strict';

var classes = require('classes');
var reactive = require('reactive');
var domify = require('domify');
var Emitter = require('emitter');
var prevent = require('prevent');
var template = require('./template.html');

var proto = Toggle.prototype;

Emitter(proto);

module.exports = Toggle;

function Toggle(val) {
  this.el = domify(template);
  this.classes = classes(this.el);
  this.view = reactive(this.el, {
    name: 'toggle',
    labels: {
      on: 'On',
      off: 'Off'
    }
  }, {
    delegate: this
  });
  this.checkbox = this.el.querySelector('.youmeb-toggle-checkbox');
  this.value(!!val);
}

proto.value = function (val) {
  if (arguments.length) {
    if (val) {
      this.classes.remove('off');
    } else {
      this.classes.add('off');
    }
    if (this.checkbox.checked !== val) {
      this.checkbox.checked = val;
      this.emit('change', val);
    }
  } else {
    return this.checkbox.checked;
  }
};

proto.labels = function (on, off) {
  var labels = this.view.get('labels');
  this.view.set('labels', {
    on: on || labels.on,
    off: off || labels.off
  });
};

proto.name = function (name) {
  this.view.set('name', name);
};

proto.onClick = function () {
  this.value(!this.value());
};

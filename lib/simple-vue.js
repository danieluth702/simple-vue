'use babel';

import SimpleVueView from './simple-vue-view';
import { CompositeDisposable } from 'atom';

export default {

  simpleVueView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.simpleVueView = new SimpleVueView(state.simpleVueViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.simpleVueView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-vue:generate': () => this.generate_template()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.simpleVueView.destroy();
  },

  serialize() {
    return {
      simpleVueViewState: this.simpleVueView.serialize()
    };
  },

  generate_template() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.setCursorScreenPosition([0,0])
      let mytemplate = `<template>

</template>

<script>
export default {
  name: 'UnknownComponent',
  data() {
    return {

    }
  }
}
</script>

<style lang='scss'>
  * {
    margin: 0;
    padding: 0;
  }

  .debugger {
    border: 2px solid red;
  }
</style>`

      editor.insertText(mytemplate, ['autoIndent'])
    }
  }

};

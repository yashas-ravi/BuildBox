import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './editorStyling.css';
import gjsBlocks from 'grapesjs-blocks-basic';
import { useEffect, useState } from 'react';
import grapesjsPluginExport from "grapesjs-plugin-export";
import { useParams } from 'react-router-dom';

export const EditorWindow = () => {

  const [editor, setEditor] = useState(null);
  const {pageId}= useParams();
 
  useEffect(() => {

  const editor = grapesjs.init({
    container: "#editor",
    storageManager: {
      type: "remote",
      stepsBeforeSave:3,
      contentTypeJson: true,
      storeComponents: true,
      storeStyles: true,
      storeHtml: true,
      storeCss: true,
      headers:{
          "Content-Type":"application/json",
      },
      id:"custom-",
      urlStore: `https://localhost:8000/api/user/storecontent/${pageId}`,
      urlLoad:  `https://localhost:8000/api/user/loadcontent/${pageId}`,
     },
    fromElement: true,
    height: '100vh',
    width: '100%',
    blockManager: {
      blocks: [ ],
    },
    panels: { },
    plugins: [gjsBlocks, grapesjsPluginExport],
    pluginsOpts: {
      gjsBlocks: {},
      grapesjsPluginExport: {},
    }
  });

  const panelManager = editor.Panels;

   panelManager.addPanel({
    id: 'logo-panel',
    buttons: [
      {
        label:"BuildBox",
      }
    ],
   });   

  panelManager.addPanel({
    id: 'gjs-pn-commands',
    el: '.gjs-pn-commands',
    buttons: [
      {
        id: 'saveDb',
        className: 'fa fa-save',
        command: 'saveDb',
      },
      {
        id: 'download',
        className: 'fa fa-download',
        command: 'download',
      },
      {
        id: 'cmd-clear',
        className: 'fa fa-trash',
        command: 'cmd-clear',
      },
      {
        id: 'undo',
        className: 'fa fa-undo',
        command: 'undo',
      },
      {
        id: 'redo',
        className: 'fa fa-redo',
        command: 'redo',
      },
    ],
   });

   editor.Commands.add("cmd-clear",{
      run: (editor)=>{editor.DomComponents.clear();
        editor.CssComposer.clear();
      },
   });

   editor.Commands.add("download",{
    run: (editor)=> editor.runCommand("gjs-export-zip"),
 });

 editor.Commands.add("saveDb",{
  run: function(editor){
    var htmldata = editor.getHtml();
    var cssdata = editor.getCss();
    console.log(htmldata);
    console.log(cssdata);
}});

   editor.Commands.add("undo",{
    run: (editor)=>{editor.UndoManager.undo();},
 });

  editor.Commands.add("redo",{
    run: (editor)=>{editor.UndoManager.redo();},
  });

  const bm = editor.Blocks;
  
  bm.add('Space', {
        label: 'Space',
        category: 'Basic',
        media: `<svg width="50" height="30" viewBox="0 0 24 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="5" fill="none" fill-rule="evenodd">
        <g id="ic_fluent_spacebar_24_regular" fill="#eeeeee" fill-rule="nonzero">
            <path d="M20.5,11 L20.5,13 C20.5,13.1380712 20.3880712,13.25 20.25,13.25 L3.75,13.25 C3.61192881,13.25 3.5,13.1380712 3.5,13 L3.5,11 C3.5,10.5857864 3.16421356,10.25 2.75,10.25 C2.33578644,10.25 2,10.5857864 2,11 C2,11.4444444 2,12.1111111 2,13 C2,13.9664983 2.78350169,14.75 3.75,14.75 L20.25,14.75 C21.2164983,14.75 22,13.9664983 22,13 L22,11 C22,10.5857864 21.6642136,10.25 21.25,10.25 C20.8357864,10.25 20.5,10.5857864 20.5,11 Z">
        </path>
        </g>
        </g>
        </svg>`,
        content:  
          `<div className="space"></div>`,
        activate: true,
  });

  bm.add('Button', {
    label: 'Button',
    category: 'Basic',
    media: `<svg width="50" height="40" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="7" width="14" height="10" rx="2" stroke="none" stroke-width="2"/>
  <rect x="12" y="9" width="5" height="6" rx="1" fill="#33363F"/>
  </svg>`,
    content: '<button className="button1">button</button>',
    activate: true,
  });

setEditor(editor);
},[]);

  return(
    <div id='editor'>
    </div>
  );
  
}

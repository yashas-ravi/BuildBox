import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './editorStyling.css';
import gjsBlocks from 'grapesjs-blocks-basic';
import { useEffect, useState } from 'react';

export const EditorWindow = () => {

  const [editor, setEditor] = useState(null);

  useEffect(() => {

  const editor = grapesjs.init({
    container: "#editor",
    storageManager: false,
    fromElement: true,
    height: '100vh',
    width: '100%',
    plugins: [gjsBlocks],
    pluginsOpts: {
      [gjsBlocks]: {},
    }
  });

setEditor(editor);
    
},[]);

  return(
    <>
    <div id='editor'></div>
    </>
  );
  
}

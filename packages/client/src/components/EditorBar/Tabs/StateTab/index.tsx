import { EditorPrePostFix } from '../../EditorPrePostFix';

export const StateTab = (props: any) => {
  const { adyenComponent, ...other } = props;
  const style = {
    '#json-editor-outer-box': {
      height: 'auto !important'
    },
    '#json-editor-labels': { display: 'none !important' }
  };

  return (
    <EditorPrePostFix
      {...other}
      sx={style}
      p={2}
      data={adyenComponent}
      handleEditorUpdate={(value: any) => {
        console.log(value);
      }}
      viewOnly={true}
      color="light"
    />
  );
};

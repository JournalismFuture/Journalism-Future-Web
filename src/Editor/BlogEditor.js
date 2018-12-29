import React from "react";
import { ContentState, Editor, EditorState, RichUtils } from "draft-js";
import styled from "styled-components";
import BlockStyleToolbar, {
  getBlockStyle
} from "./BlockStyles/BlockStyleToolbar";
import DraftPasteProcessor from "draft-js/lib/DraftPasteProcessor";

const Main = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  border-style: solid;
  border-color: red;
  margin: 8px;
  height: 400px;
`;

class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    let editorState;

    const processedHTML = DraftPasteProcessor.processHTML(
      "<h1>Hello World</h1>" + "<hr/>some text"
    );
    const contentState = ContentState.createFromBlockArray(processedHTML);
    editorState = EditorState.createWithContent(contentState);
    editorState = EditorState.moveFocusToEnd(editorState);

    this.state = {
      editorState: editorState
    };
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  render() {
    return (
      <Main>
        <BlockStyleToolbar
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <button onClick={this.onUnderlineClick}>U</button>
        <button onClick={this.onBoldClick}>
          <b>B</b>
        </button>
        <button onClick={this.onItalicClick}>
          <em>I</em>
        </button>{" "}
        <Container>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </Container>
      </Main>
    );
  }
}

export default BlogEditor;

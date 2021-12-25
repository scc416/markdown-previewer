import { marked } from "marked";
import createMarkup from "../helper/createMarkup";

const Preview = ({ code }) => {
  return (
    <>
      <div className="title">
        <i className="fas fa-eye"></i> Preview
      </div>
      <div
        className="preview inner-container"
        dangerouslySetInnerHTML={createMarkup(
          marked(code, {
            breaks: true,
          })
        )}
      />
    </>
  );
};

export default Preview;

import Section from "./Section";

const SectionList = (props) => {
  return (
    <div>
      {props.sections.map((section, index) => (
        <Section key={index} id={index} {...section} />
      ))}
    </div>
  );
};

export default SectionList;

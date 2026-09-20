interface HeadingProps {
  center?: boolean;
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ center, text }) => {
  return (
    <h2
      className={`text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {text}
    </h2>
  );
};

export default Heading;
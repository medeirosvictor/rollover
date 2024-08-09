interface HeaderProps {
    title: string,
}

const Header = ({title}: HeaderProps) => {
  return (
    <h1 className='header text-center'>{title}</h1>
  );
};

export default Header;

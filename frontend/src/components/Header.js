import PropTypes from 'prop-types';

const Header = ({title}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
        </header>
    )
};

Header.defaultProps = {
    title: 'working title'
};

Header.protoTypes = {
    title: PropTypes.string
};

//CSS in JS
//const headingStyle = {color: 'red', backgroundColor:'blue'};

export default Header;


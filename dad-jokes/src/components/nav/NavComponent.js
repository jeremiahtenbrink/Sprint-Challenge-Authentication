import React                from "react";
import ProptTypes           from "prop-types";
import { NavLink, NavItem } from "reactstrap";

const NavComponent = props => {
    return (
        <NavItem>
            <NavLink href={ props.link }>{ props.title }</NavLink>
        </NavItem>
    );
};

NavComponent.propTypes = {
    link:  ProptTypes.string,
    title: ProptTypes.string,
};

export default NavComponent;
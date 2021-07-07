import React, { Component } from "react";
import { render } from "react-dom";
import Select, { components } from "react-select";

const options = [
    { value: "England", label: "England", icon: "england.svg" },
    { value: "Germany", label: "Germany", icon: "germany.svg" }
];

const { Option } = components;
const IconOption = props => (
    <Option {...props}>
        <img
            src={require('./' + props.data.icon)}
            style={{ width: 36 }}
            alt={props.data.label}
        />
        {props.data.label}
    </Option>
);

export default class Tests extends Component {
    constructor() {
        super();
        this.state = {
            name: "React"
        };
    }

    render() {
        return (
            <Select
                defaultValue={options[0]}
                options={options}
                components={{ Option: IconOption }}
            />
        );
    }
}

render(<Tests />, document.getElementById("root"));

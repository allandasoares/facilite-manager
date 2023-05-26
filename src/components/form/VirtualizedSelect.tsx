import React from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

const height = 35;

const MenuList = (props) => {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

export default function VirtualizedSelect({ options, ...props }) {
  return (
    <Select
      {...props}
      options={options}
      components={{
        MenuList,
      }}
      styles={{
        menuList: (base) => ({
          ...base,
          height: options.length * height,
        }),
      }}
    />
  );
}

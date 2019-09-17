import React, { useState } from "react";
import "./App.css";
import { Dispatch } from "redux";
import { add, toggle, setFilter, remove } from "./actions";
import { connect } from "react-redux";
import { ItemState, Item, Filters } from "./store";

function mapStateProps(state: ItemState) {
  return { list: state.items, filterSelected: state.filterSelected };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    add(t: string) {
      dispatch(add(t));
    },
    remove(index: number) {
      dispatch(remove(index));
    },
    toggle(index: number) {
      dispatch(toggle(index));
    },
    setFilter(f: Filters) {
      dispatch(setFilter(f));
    }
  };
}

const AppPure: React.FC<
  ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateProps>
> = ({ list, add, remove, toggle, filterSelected, setFilter }) => {
  const [inputText, updateInputText] = useState("");

  function addItem() {
    add(inputText);
    updateInputText("");
  }

  function itemFilter(item: Item) {
    return filterSelected === Filters.All
      ? true
      : filterSelected === Filters.Completed
      ? item.isDone
      : !item.isDone;
  }

  return (
    <div className="App">
      <h3>TO DO LIST</h3>
      <input
        placeholder="Item to add"
        value={inputText}
        onChange={e => updateInputText(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            addItem();
          }
        }}
      />
      <button onClick={addItem} className="add-button">
        ADD
      </button>
      <div className="input-container">
        {list.filter(itemFilter).map((item, id) => (
          <li className={item.isDone ? "done" : "not-done"} key={id}>
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={() => toggle(id)}
            />
            {item.name}
            <button onClick={() => remove(id)}>x</button>
          </li>
        ))}
      </div>

      <div>
        <span>Filter: </span>
        <button onClick={() => setFilter(Filters.All)}>All</button>
        <button onClick={() => setFilter(Filters.Completed)}>Completed</button>
        <button onClick={() => setFilter(Filters.Selected)}>
          Not Completed
        </button>
      </div>
    </div>
  );
};

export const App = connect(
  mapStateProps,
  mapDispatchToProps
)(AppPure);

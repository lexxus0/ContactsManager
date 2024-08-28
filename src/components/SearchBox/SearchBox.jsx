import css from "./SearchBox.module.css";
import { SlMagnifier } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

const SearchBox = ({}) => {
  const dispatch = useDispatch();

  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchWrapper}>
      <p className={css.searchP}>Find contacts by name:</p>
      <input
        className={css.searchInput}
        type="text"
        value={filter}
        onChange={handleChange}
      />
      {!filter && <SlMagnifier className={css.searchIcon} />}
    </div>
  );
};

export default SearchBox;

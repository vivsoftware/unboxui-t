import React, {useState} from 'react';
import { Eye } from 'react-feather';
import { useDispatch } from 'react-redux';

const ModelViewProduct = ({ elem }) => {
  const dispatch = useDispatch();
  const ModelOpen = (e) => {
    e.preventDefault();
    dispatch({
      type: 'IS_MODAL',
      payload: elem,
    });
  };
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <> 
    <li
      onClick={(e) => {
        ModelOpen(e);
      }}>
      <a href='#javascript'
      onMouseEnter={onHover}
      onMouseLeave={onLeave}>
      { hover ? "Quick View" : <Eye/> }
      </a>
    </li>
    </>
  );
};

export default ModelViewProduct;

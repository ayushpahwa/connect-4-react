import { IMAGE_DATA, P1_COLOR, P2_COLOR } from '../../constants';
import './Game.css';

export const Item = ({ value, col, row, onItemClicked }) => {
    let backgroundColor = 'white';
    let borderColor = '';
    let border = '';
    if (value > 2) {
        value -= 2;
        border = 'solid';
        borderColor = 'red';
    }
    if (value === 1) {
        backgroundColor = P1_COLOR;
    } else if (value === 2) {
        backgroundColor = P2_COLOR;
    }

    return (
        <div style={{ backgroundColor, border, borderColor }} className='item' onClick={() => {
            if (row === 0 && value === 0) {
                onItemClicked(col);
            }
        }}
            onMouseOver={(e) => {
                if (row === 0 && value === 0) {
                    e.target.style.backgroundColor = 'red';
                }
            }}
            onMouseLeave={(e) => {
                if (row === 0 && value === 0) { e.target.style.backgroundColor = 'white'; }
            }}
        >
            {value > 0 ?
                <img src={IMAGE_DATA[value - 1]} alt={"Player " + value} /> :
                <></>}
        </div>
    )
}
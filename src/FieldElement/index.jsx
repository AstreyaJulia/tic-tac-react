import PropTypes, {number, string} from "prop-types";

/** Элемент-плашка
 *
 * @param position - позиция в массиве [0, 1 ....]
 * @param state - состояние 0, 'х', 'o'
 * @param clickHandler - ф-я, срабатывающая при нажатии на элемент
 * @param newGame - состояние включенной игры, элементы разблокируются
 * @returns {JSX.Element} - элемент
 * @constructor
 */
const FieldElement = ({position, state, clickHandler, newGame}) => {

    const states = {
        0: '', // пустое
        'x': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" className='w-full h-full text-emerald-500'>
            <path fill="currentColor"
                  d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27"></path>
        </svg>,
        'o':
            <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full text-red-500' viewBox="0 0 15 15">
                <path fill="currentColor"
                      d="M7.5 12.3a4.8 4.8 0 1 1 0-9.6a4.8 4.8 0 0 1 0 9.6m0 1.7a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13"></path>
            </svg>
    }

    return (
        <li>
            <button type='button' disabled={!newGame} className="w-full h-full border border-gray-200 rounded-md"
                    onClick={() => clickHandler(position)}>
                {states[state]}
            </button>
        </li>
    )
}

FieldElement.propTypes = {
    position: PropTypes.number.isRequired,
    state: PropTypes.oneOfType([number, string]).isRequired,
    clickHandler: PropTypes.func.isRequired,
    newGame: PropTypes.bool.isRequired,
}

export default FieldElement
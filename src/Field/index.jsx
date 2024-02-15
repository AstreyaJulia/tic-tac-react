import FieldElement from "../FieldElement/index.jsx";
import PropTypes from "prop-types";

/** Компонент, отрисовывающий поле
 * @param field - массив игрового поля
 * @param playerName - имя текущего игрока
 * @param fieldElementChange - ф-я для передачи в родительский компонент индекса нажатого элемента
 * @param newGame - состояние включенной игры, блокирует кнопку начала новой игры
 * @param startGame - ф-я для передачи в родительский компонент события о начале новой игры
 * @returns {JSX.Element}
 * @constructor
 */
const Field = ({field, playerName, fieldElementChange, newGame, startGame}) => {
    return (
        <>
            <p className='text-gray-800 text-2xl w-96 text-center font-bold mb-6'>Ход игрока {playerName}</p>
            <ul className='w-96 h-96 border border-gray-300 rounded-md grid grid-cols-3 grid-rows-3 p-2 gap-2'>
                {field.map((item, key) => <FieldElement key={key} newGame={newGame} state={item} position={key} clickHandler={(position)=>fieldElementChange(position)}/>)}
            </ul>
            <button type='button' disabled={newGame} onClick={()=>startGame()} className='py-1 px-2 bg-blue-600 hover:bg-blue-700 focus:outline-0 focus:ring-2 focus:ring-blue-500/30 shadow border border-blue-600 hover:border-blue-600 text-white text-base font-medium rounded-md mt-6 disabled:bg-blue-300'>Начать игру</button>
        </>
)
}

Field.propTypes = {
    field: PropTypes.array.isRequired,
    playerName: PropTypes.string.isRequired,
    fieldElementChange: PropTypes.func.isRequired,
    newGame: PropTypes.bool.isRequired,
    startGame: PropTypes.func.isRequired
}

export default Field
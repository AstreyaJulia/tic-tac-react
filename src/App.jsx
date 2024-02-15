import {useState} from 'react'
import Field from "./Field/index.jsx";

function App() {

    /** Данные об игроках
     * @type {[{name: string, state: string},{name: string, state: string}]}
     */
    const player = [
        {name: 'Игрок', state: 'x'}, // [0] player[0].name
        {name: 'Компьютер', state: 'o'} // [1] player[1].name
    ]

    /** Массив из индексов выигрышных комбинаций */
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    /** Состояние начала игры. false - игра не начата */
    const [newGame, setNewGame] = useState(false);

    /** Состояние поля */
    /*
    [0, 1, 2,
     3, 4, 5,
     6, 7, 8]
     */
    const [field, setField] = useState(
        [0, 0, 0,
            0, 0, 0,
            0, 0, 0]);

    /** Состояние текущего игрока (индекс массива) */
        // игрок, делающий ход. const [currentPlayer - переменная, setCurrentPlayer - ф-я меняющая переменную]
    const [currentPlayer, setCurrentPlayer] = useState(0)

    /** Ф-я, которая меняет значение поля по индексу массива
     * @param position - позиция элемента в field
     * @returns {null}
     */
    const fieldElementChange = (position) => {
        // если поле не пустое (не 0)
        if (field[position] === 0) {
            // меняем значение поля по позиции на значение фишки текущего игрока, меняя начальный массив
            field[position] = player[currentPlayer].state
            // пишем измененный массив в состояние
            setField([...field]) // ВАЖНО! setField(field) не работает
        } else {
            // если поле не пустое, то ничего не делаем
            return null
        }
    }

    const checkWinner = () => {
        // получаем массив с индексами полей, в которых стоят элементы текущего пользователя
        const indexes = field.map((item, index) => {
            if (item.toString() === player[currentPlayer].state) {
                return index
            }
            // фильтруем от значений undefined
        }).filter((item) => item !== undefined)
// фильтруем массив из выигрышных комбинаций, соединяя каждый массив с индексами и текущую итерацию массива выигрышных
// комбинаций в строки и проверяя, содержит ли первая строка вторую строку (проверять содержит ли массив все элементы второго массива сложнее, потому используем строки)
        return winCombinations.filter((item) => indexes.join('').toString().includes(item.join('').toString()))
    }

    /** Ф-я начала новой игры*/
    const startGameHandler = () => {
        // устанавливаем флаг начала новой игры, для блокирвоки/разблокировки кнопок
        setNewGame(true);
        // устанавливаем ход игроку, чтобы первым ходил игрок
        setCurrentPlayer(0);
        // обнуляем игровое поле
        setField([0, 0, 0,
            0, 0, 0,
            0, 0, 0])
    }

    /** Функция хода
     * @param position
     */
    const makeTurn = (position) => {
        const turn = fieldElementChange(position);

        // даем ход другому игроку, если ф-я не вернула null
        if (turn !== null) {
            setCurrentPlayer(currentPlayer === 0 ? 1 : 0)
        }
        // проверяем победителя
        console.log(checkWinner().length > 0 && 'Победитель ' + player[currentPlayer].name)
    }

    return (
        <Field playerName={player[currentPlayer].name} field={field} newGame={newGame}
               startGame={() => startGameHandler()}
               fieldElementChange={(position) => makeTurn(position)}/>
    )
}

export default App

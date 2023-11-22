import { addMassage, DialogsPageType, dialogsReducer, updateNewMessageText } from './dialogsReducer'
import { v1 } from 'uuid'

describe('dialogsReducer', () => {
    let initialState: DialogsPageType

    beforeEach(() => {
        initialState = {
            dialogsData: [
                { id: v1(), name: 'Terry McDaniel', src: 'user1' },
                { id: v1(), name: 'Randy Russell', src: 'user3' },
                { id: v1(), name: 'Charlotte Peters', src: 'user2' },
                { id: v1(), name: 'Pearl Ward', src: 'user5' },
                { id: v1(), name: 'Martha Gross', src: 'user4' },
            ],
            messageData: [
                { id: v1(), message: 'Hello Linh!' },
                { id: v1(), message: '👋 Hi Gabriel' },
                { id: v1(), message: 'I really love your work, a great job 💪' },
                { id: v1(), message: 'Thank you, I also love it.' },
                { id: v1(), message: 'Good morning ☀️' },
            ],
            newMessageText: '',
        }
    })

    it('should add a new message', () => {
        const action = addMassage()
        const newState = dialogsReducer(initialState, action)

        expect(newState.messageData.length).toBe(6)
    })

    it('should update the new message text', () => {
        const action = updateNewMessageText('Hello, there!')
        const newState = dialogsReducer(initialState, action)

        expect(newState.newMessageText).toBe('Hello, there!')
    })
})

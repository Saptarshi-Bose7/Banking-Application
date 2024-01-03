import Reducer, { ArticleState, IArticle } from './Reducers/Reducer'; // Update with path to your reducer
import { CREDIT, DEBIT, SET_DATA } from './Actions/constant';

// Define a mock article to use in tests
const mockArticle: IArticle = {
    id: '1',
    Date: '2022-02-22T18:30:00.000Z',
    Name: 'Adrita',
    CreditOrDebit: "Credit",
    Amount: 200
};

// Define the initialState
const initialState: ArticleState = {
    Data: [],
    balance: 0,
    accountType: 'Savings'
};

describe('Reducer', () => {
    it('should return the initial state when an action is not matched', () => {
        expect(Reducer(undefined, { type: 'UNKNOWN_ACTION', data: mockArticle, Data: mockArticle, payload: 100 })).toEqual(initialState);
    });

    it('should handle SET_DATA', () => {
        const expectedState: ArticleState = {
            ...initialState,
            Data: [mockArticle]
        };
        expect(Reducer(initialState, { type: SET_DATA, data: mockArticle, Data: mockArticle, payload: 100 })).toEqual(expectedState);
    });

    it('should handle CREDIT', () => {
        const expectedState: ArticleState = {
            ...initialState,
            balance: 100
        };
        expect(Reducer(initialState, { type: CREDIT, data: mockArticle, Data: mockArticle, payload: 100 })).toEqual(expectedState);
    });

    it('should handle DEBIT', () => {
        const stateBefore : ArticleState = {
            ...initialState,
            balance: 200
        };
        const expectedState: ArticleState = {
            ...stateBefore,
            balance: 100
        };
        expect(Reducer(stateBefore, { type: DEBIT, data: mockArticle, Data: mockArticle, payload: 100 })).toEqual(expectedState);
    });
});
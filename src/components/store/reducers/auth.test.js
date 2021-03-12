import reducer form './auth';
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer',()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null, 
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypse.AUTH_SUCCESS,
            idToken :'some-token',
            userId: 'some-user-id'
        });
    });

    it('should store the token upon login',()=>{
        expect(reducer({
            token: null, 
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEaual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        }) 
    })
})
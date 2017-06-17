import { handleActions } from 'redux-actions'
import { UPDATE_TEAM, UPDATE_TEAMS, CREATE_TEAM, UPDATE_MEMBERS } from '../types'

export default handleActions({
  [UPDATE_TEAM] (state, action) {
    return {
      ...state,
      teams: state.teams.map(team => {
        if (team.objectId == action.payload.team.objectId) {
          return action.payload.team
        } else {
          return team
        }
      })
    }
  },
  [UPDATE_TEAMS] (state, action) {
    return {
      ...state,
      teams: action.payload.teams
    }
  },
  [CREATE_TEAM] (state, action) {
    return {
      ...state,
      teams: [...state.teams, action.payload.team]
    }
  },
  [UPDATE_MEMBERS] (state, action) {
    return {
      ...state,
      teamsMembers: {
        ...state.teamsMembers,
        [action.payload.teamId]: action.payload.members
      }
    }
  },
}, {
  teams: [],
  teamsMembers: {}
})

import { useEffect, useState } from "react";
import { NoteList } from "./types"
import { fetchNoteList } from "./auth";

interface IdleRequestState {
  status: 'idle'
}

interface LoadingRequestState {
  status: 'pending'
}

interface SuccessRequestState {
  status: 'success';
  data: NoteList
}

interface ErrorRequestState {
  status: 'error';
  error: unknown
}

type RequestState = IdleRequestState | LoadingRequestState | SuccessRequestState | ErrorRequestState

export function useNoteList() {                                                  // хук для управления состояниями запроса
  const [state, setState] = useState<RequestState>({ status: 'idle' })

  useEffect(() => {
    if (state.status === 'pending') {
      fetchNoteList().then((data) => setState({ status: 'success', data: data.list }))
        .catch((error) => {
          setState({ status: 'error', error: error })
        })
    }
  }, [state])

  useEffect(() => {
    setState({ status: 'pending' })
  }, [])

  const refetch = () => {
    setState({ status: 'pending' })
  }

  return { state, refetch }
}


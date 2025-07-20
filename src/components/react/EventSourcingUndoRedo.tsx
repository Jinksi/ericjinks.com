import { useMemo, useReducer } from 'react'

// State types - these represent the data that is being stored
type CanvasElement = {
  id: string
  type: 'circle' | 'square'
  x: number
  y: number
  size: number
  color: string
}

// Event types - these represent things that happen to the data, similar to a redux action
type CanvasAction = {
  id: string
  type: 'ADD_CIRCLE' | 'ADD_SQUARE'
  x: number
  y: number
  size: number
  color: string
}

// Undo/redo action types
type UndoRedoAction = {
  type: 'UNDO' | 'REDO' | 'SET_HISTORY_INDEX'
  index?: number
}

// Event store - log of domain events and history index for tracking position in history
type EventStore = {
  events: CanvasAction[]
  historyIndex: number
}
const eventReducer = (
  store: EventStore,
  action: CanvasAction | UndoRedoAction
): EventStore => {
  switch (action.type) {
    case 'ADD_CIRCLE':
    case 'ADD_SQUARE':
      // If we're not at the end of history, truncate future events (branching)
      const truncatedEvents = store.events.slice(0, store.historyIndex)
      return {
        events: [...truncatedEvents, action],
        historyIndex: store.historyIndex + 1,
      }

    case 'UNDO':
      return {
        ...store,
        historyIndex: Math.max(0, store.historyIndex - 1),
      }

    case 'REDO':
      return {
        ...store,
        historyIndex: Math.min(store.events.length, store.historyIndex + 1),
      }

    case 'SET_HISTORY_INDEX':
      if (action.index === undefined) {
        return store
      }
      return {
        ...store,
        historyIndex: action.index,
      }

    default:
      return store
  }
}

// State reconstruction from events, using the historyIndex to determine which events to include
const getStateFromEvents = (
  events: CanvasAction[],
  historyIndex: number
): CanvasElement[] => {
  const currentEvents = events.slice(0, historyIndex)
  return currentEvents.map((event): CanvasElement => {
    return {
      id: event.id,
      type: event.type === 'ADD_CIRCLE' ? 'circle' : 'square',
      x: event.x,
      y: event.y,
      size: event.size,
      color: event.color,
    }
  })
}

const useCanvasElementsState = (
  initialEvents: CanvasAction[] = [],
  initialHistoryIndex: number = 0
) => {
  const [store, dispatch] = useReducer(eventReducer, {
    events: initialEvents,
    historyIndex: initialHistoryIndex,
  })

  // Derive the current state from the events
  const canvasElements = useMemo(
    () => getStateFromEvents(store.events, store.historyIndex),
    [store]
  )

  const undo = () => {
    dispatch({ type: 'UNDO' })
  }

  const redo = () => {
    dispatch({ type: 'REDO' })
  }

  return {
    canvasElements,
    events: store.events,
    dispatch,
    undo,
    redo,
    canUndo: store.historyIndex > 0,
    canRedo: store.historyIndex < store.events.length,
    historyIndex: store.historyIndex,
  }
}

const initialEvents: CanvasAction[] = [
  {
    id: crypto.randomUUID(),
    type: 'ADD_CIRCLE',
    x: 75.82579443088798,
    y: 24.14071434050644,
    size: 14.592899727969268,
    color: '#56c855',
  },
  {
    id: crypto.randomUUID(),
    type: 'ADD_SQUARE',
    x: 27.316043760768526,
    y: 1.9922755772784462,
    size: 19.268002126893357,
    color: '#e0d451',
  },
]

const EventSourcingUndoRedo = () => {
  const {
    canvasElements,
    events,
    dispatch,
    undo,
    redo,
    canUndo,
    canRedo,
    historyIndex,
  } = useCanvasElementsState(initialEvents, initialEvents.length)

  const addShape = (action: 'ADD_CIRCLE' | 'ADD_SQUARE') => {
    const randomX = Math.random() * 100
    const randomY = Math.random() * 100
    const randomSize = Math.random() * 10 + 10
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    dispatch({
      id: crypto.randomUUID(),
      type: action,
      x: randomX,
      y: randomY,
      size: randomSize,
      color: randomColor,
    })
  }

  return (
    <div data-testid="event-sourcing-undo-redo">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="bg-code rounded-lg"
      >
        {canvasElements.map((element) => {
          if (element === null) return null
          return element.type === 'circle' ? (
            <circle
              key={element.id}
              cx={element.x}
              cy={element.y}
              r={element.size}
              fill={element.color}
            />
          ) : (
            <rect
              key={element.id}
              x={element.x}
              y={element.y}
              width={element.size}
              height={element.size}
              fill={element.color}
            />
          )
        })}
      </svg>

      <div className="flex gap-2 my-2.5">
        <button
          type="button"
          onClick={() => addShape('ADD_CIRCLE')}
          className="px-4 py-2 bg-bg border border-text rounded hover:bg-text hover:text-background transition-colors"
        >
          Add Circle
        </button>
        <button
          type="button"
          onClick={() => addShape('ADD_SQUARE')}
          className="px-4 py-2 bg-bg border border-text rounded hover:bg-text hover:text-background transition-colors"
        >
          Add Square
        </button>
      </div>
      <div className="flex gap-2 my-2.5">
        <button
          type="button"
          onClick={undo}
          disabled={!canUndo}
          className="px-4 py-2 bg-transparent text-text border border-text rounded hover:bg-text hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text"
        >
          ↩ Undo
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={!canRedo}
          className="px-4 py-2 bg-transparent text-text border border-text rounded hover:bg-text hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text"
        >
          ↪ Redo
        </button>
      </div>

      <div>
        <em>Event history index timeline. Click to jump to an event.</em>
        {events.map((event, index) => {
          const isCurrent = index === historyIndex - 1
          const icon = event.type === 'ADD_CIRCLE' ? '●' : '■'
          return (
            <button
              key={event.id}
              type="button"
              tabIndex={0}
              className="block appearance-none cursor-pointer select-none bg-transparent border-none p-0 m-0 text-left"
              onClick={() => {
                dispatch({ type: 'SET_HISTORY_INDEX', index: index + 1 })
              }}
            >
              <code
                className={`my-1 leading-tight ${
                  isCurrent
                    ? 'border-2 border-highlight bg-highlight text-background'
                    : 'border-2 border-black text-text'
                }`}
              >
                {event.type}{' '}
                <span style={{ color: event.color }} className="text-4xl">
                  {icon}
                </span>
              </code>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EventSourcingUndoRedo

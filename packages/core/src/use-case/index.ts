export interface CommandContext {
  userId: string
  sessionId?: string
  ipAddress?: string
}

export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
}

export interface Query<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
}

export interface Command<TInput, TOutput = void> {
  execute(input: TInput, context?: CommandContext): Promise<TOutput>
}
import { QueryClient } from "@tanstack/react-query";

// QueryClient - это библиотека для управления серверным состоянием(запросы API, кэширование, синхронизация), глобальный менеджер для работы с API-запросами

export const queryClient = new QueryClient()   // создаем экземпляр
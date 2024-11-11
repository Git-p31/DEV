using System;
using System.Collections.Generic;

public class QuizServer
{
    // Словарь для хранения правильных ответов для каждого уровня и вопроса
    private static readonly Dictionary<int, List<int>> correctAnswers = new Dictionary<int, List<int>>
    {
        // Правильные ответы для уровня Easy
        { 1, new List<int> { 1, 2, 2, 1, 2, 2, 2, 1, 2, 3 } },

        // Правильные ответы для уровня Medium
        { 2, new List<int> { 1, 1, 2, 1, 2, 2, 2, 2, 1, 1 } },

        // Правильные ответы для уровня Hard
        { 3, new List<int> { 1, 1, 3, 1, 2, 1, 1, 1, 1, 1 } }
    };

    // Метод для проверки правильности ответа
    public static bool CheckAnswer(int level, int questionIndex, int answer)
    {
        // Проверка существования уровня и вопроса
        if (correctAnswers.ContainsKey(level) && questionIndex >= 0 && questionIndex < correctAnswers[level].Count)
        {
            // Сравнение ответа пользователя с правильным ответом
            return correctAnswers[level][questionIndex] == answer;
        }
        return false;
    }

    // Метод для получения текущего счета пользователя на основе его ответов
    public static int GetUserScore(List<int> userAnswers, int level)
    {
        int score = 0;

        // Проход по всем вопросам и сравнение ответов
        for (int i = 0; i < userAnswers.Count; i++)
        {
            if (CheckAnswer(level, i, userAnswers[i]))
            {
                score++;
            }
        }
        return score;
    }

    // Метод для получения правильного ответа для конкретного вопроса
    public static int GetCorrectAnswer(int level, int questionIndex)
    {
        // Проверка существования уровня и вопроса
        if (correctAnswers.ContainsKey(level) && questionIndex >= 0 && questionIndex < correctAnswers[level].Count)
        {
            return correctAnswers[level][questionIndex];
        }
        return -1; // Возвращение -1, если вопрос не существует
    }

    // Дополнительный метод для получения всех правильных ответов для уровня
    public static List<int> GetCorrectAnswersForLevel(int level)
    {
        if (correctAnswers.ContainsKey(level))
        {
            return correctAnswers[level];
        }
        return null; // Возвращение null, если уровень не существует
    }
}

namespace WebApplication1.Schema
{
    public class Quiz
    {
        public string Name { get; set; }
        public List<Question> Questions { get; set; }
    }

    public class Question
    {
        public string QuestionText { get; set; }
        public string Answer { get; set; }
    }
}
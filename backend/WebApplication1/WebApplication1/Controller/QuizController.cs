using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using WebApplication1.Schema;

[ApiController]
[Route("[controller]")]
public class QuizController : ControllerBase
{
    private readonly IMongoCollection<BsonDocument> _collection;

    public QuizController()
    {
        var client =
            new MongoClient(
                "mongodb+srv://stefanallen10:sHUdKdhPDE2es0yM@cluster0.v4noiez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        var database = client.GetDatabase("Database");
        _collection = database.GetCollection<BsonDocument>("Quiz");
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var quizzes = _collection.Find(new BsonDocument()).ToList();
        var quizModels = quizzes.Select(quiz =>
        {
            var questions = quiz.Contains("Questions") ? quiz["Questions"].AsBsonArray.Select(q => new Question
            {
                QuestionText = q["Question"].AsString,
                Answer = q["Answer"].AsString
            }).ToList() : new List<Question>();

            return new Quiz
            {
                Name = quiz["Quiz Title"].AsString,
                Questions = questions
            };
        }).ToList();
        return Ok(quizModels);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Quiz quiz)
    {
        var document = new BsonDocument
        {
            { "Quiz Title", quiz.Name },
            { "Questions", new BsonArray(quiz.Questions.Select(q => new BsonDocument { { "Question", q.QuestionText }, { "Answer", q.Answer } })) }
        };

        _collection.InsertOne(document);
        return Ok();
    }
}
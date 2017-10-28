using Jumble.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Jumble.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpPost]
        public JsonResult GetAllDataFromCsvFile()
        {
            var dataFile = Server.MapPath("~/Files/riddle.csv");
            List<Data> result = new List<Data>();
            if (System.IO.File.Exists(dataFile))
            {
             var  userData = System.IO.File.ReadAllLines(dataFile);
                if (userData != null)
                {
                    for (int i = 0; i < userData.Length; i++)
                    {
                        var line = userData[i];
                        Data d = new Data();
                        var values = line.Split(',');
                        var currentIndex = 0;
                        if (values[currentIndex].Contains("\""))
                        {
                            var myQuestion = "";

                            myQuestion += values[currentIndex]+",";
                            currentIndex++;
                            while (!values[currentIndex].Contains("\""))
                            {
                                myQuestion += values[currentIndex]+",";
                                currentIndex++;
                            }
                            myQuestion += values[currentIndex];
                            d.Riddle = myQuestion.Replace("\"", String.Empty);
                        }
                        else
                        {
                            d.Riddle = values[currentIndex];
                        }
                        d.JumbleWord1 = getWordWithHint(values[currentIndex+1]);
                        d.JumbleWord2 = getWordWithHint(values[currentIndex + 2]);
                        d.JumbleWord3 = getWordWithHint(values[currentIndex + 3]);
                        d.JumbleWord4 = getWordWithHint(values[currentIndex + 4]);

                        d.Answer = values[currentIndex+5];
                        result.Add(d);
                    }
                }
            }
            return Json(result,JsonRequestBehavior.AllowGet);
        }
        private Tuple<string, string> getWordWithHint(string word)
        {
            char[] letters = word.ToCharArray();
            string hint = "";
            foreach (char c in letters)
            {
                if (Char.IsUpper(c))
                {
                    hint += c;
                }
            }
            return new Tuple<string, string>(word.ToLower(), hint);
        }
     
    }
}
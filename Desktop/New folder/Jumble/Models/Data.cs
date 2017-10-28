using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Jumble.Models
{
    public class Data
    {
        public string Riddle { get; set; }
        public Tuple<string,string> JumbleWord1 { get; set; }
        public Tuple<string, string> JumbleWord2 { get; set; }
        public Tuple<string, string> JumbleWord3 { get; set; }
        public Tuple<string, string> JumbleWord4 { get; set; }
        public string Answer { get; set; }
    }
}
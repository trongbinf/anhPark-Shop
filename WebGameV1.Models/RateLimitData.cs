using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebGameV1.Models
{
    public class RateLimitData
    {
        public int Attempts { get; set; } = 0;
        public DateTime LastAttempt { get; set; } = DateTime.MinValue;
        public DateTime FirstAttempt { get; set; } = DateTime.MinValue;
    }
}

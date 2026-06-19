"""
╔══════════════════════════════════════╗
║        PYTHON CALCULATOR v1.0        ║
╚══════════════════════════════════════╝
Supports: +  -  *  /  //  %  **  sqrt  history
"""

import math
import os


# ── Colour helpers (ANSI) ──────────────────────────────────────────────────
CYAN    = "\033[96m"
GREEN   = "\033[92m"
YELLOW  = "\033[93m"
RED     = "\033[91m"
BOLD    = "\033[1m"
RESET   = "\033[0m"
DIM     = "\033[2m"


def banner():
    print(f"""
{CYAN}{BOLD}
  ╔══════════════════════════════════════╗
  ║        PYTHON CALCULATOR v1.0        ║
  ║  type 'help' for commands  |  'q' quit ║
  ╚══════════════════════════════════════╝
{RESET}""")


def help_menu():
    print(f"""
{YELLOW}{BOLD}── Operations ──────────────────────────{RESET}
  {GREEN}+   {RESET}  Addition          e.g.  5 + 3
  {GREEN}-   {RESET}  Subtraction       e.g.  10 - 4
  {GREEN}*   {RESET}  Multiplication    e.g.  6 * 7
  {GREEN}/   {RESET}  Division          e.g.  9 / 2
  {GREEN}//  {RESET}  Floor Division    e.g.  9 // 2
  {GREEN}%   {RESET}  Modulo            e.g.  10 % 3
  {GREEN}**  {RESET}  Power             e.g.  2 ** 8

{YELLOW}{BOLD}── Special Commands ─────────────────────{RESET}
  {GREEN}sqrt <n>     {RESET}  Square root       e.g.  sqrt 144
  {GREEN}abs <n>      {RESET}  Absolute value    e.g.  abs -42
  {GREEN}log <n>      {RESET}  Log base-10       e.g.  log 1000
  {GREEN}ln <n>       {RESET}  Natural log       e.g.  ln 2.718
  {GREEN}history      {RESET}  Show past results
  {GREEN}clear        {RESET}  Clear the screen
  {GREEN}q / quit     {RESET}  Exit
""")


# ── Core calculation ───────────────────────────────────────────────────────
def calculate(expression: str, history: list) -> str:
    """Parse and evaluate one expression. Returns result as a string."""
    expr = expression.strip().lower()

    # ── Unary / keyword commands ──────────────────────────────────────────
    for keyword, func, label in [
        ("sqrt", math.sqrt, "√"),
        ("abs",  abs,       "|·|"),
        ("log",  math.log10,"log₁₀"),
        ("ln",   math.log,  "ln"),
    ]:
        if expr.startswith(keyword):
            num_str = expr[len(keyword):].strip()
            if not num_str:
                return f"{RED}Usage: {keyword} <number>{RESET}"
            try:
                n = float(num_str)
                result = func(n)
                result = int(result) if result == int(result) else round(result, 10)
                entry = f"{label}({num_str}) = {result}"
                history.append(entry)
                return f"{GREEN}{BOLD}{result}{RESET}"
            except ValueError as e:
                return f"{RED}Error: {e}{RESET}"

    # ── Binary expression ─────────────────────────────────────────────────
    # Supported operators (order matters for parsing)
    for op in ["**", "//", "+", "-", "*", "/", "%"]:
        # Split on the operator, being careful with negative numbers
        # For '-' we skip if it's a unary minus at the start
        if op == "-":
            # find '-' that is NOT the first character and NOT preceded by 'e' (scientific)
            idx = expr.rfind("-")
            if idx <= 0:
                continue
        else:
            idx = expr.rfind(op)
            if idx < 0:
                continue

        left_str  = expr[:idx].strip()
        right_str = expr[idx + len(op):].strip()

        if not left_str or not right_str:
            continue

        try:
            a = float(left_str)
            b = float(right_str)

            if op == "+"  : result = a + b
            elif op == "-": result = a - b
            elif op == "*": result = a * b
            elif op == "/":
                if b == 0:
                    return f"{RED}Error: Division by zero{RESET}"
                result = a / b
            elif op == "//":
                if b == 0:
                    return f"{RED}Error: Division by zero{RESET}"
                result = a // b
            elif op == "%":
                if b == 0:
                    return f"{RED}Error: Modulo by zero{RESET}"
                result = a % b
            elif op == "**": result = a ** b

            # Clean up: show int if result is whole
            display = int(result) if isinstance(result, float) and result == int(result) else round(result, 10)
            entry = f"{left_str} {op} {right_str} = {display}"
            history.append(entry)
            return f"{GREEN}{BOLD}{display}{RESET}"

        except ValueError:
            continue  # try next operator

    return f"{RED}Error: Could not parse '{expression}'. Type 'help' for usage.{RESET}"


def show_history(history: list):
    if not history:
        print(f"  {DIM}No history yet.{RESET}")
        return
    print(f"\n{YELLOW}{BOLD}── Calculation History ─────────────────{RESET}")
    for i, entry in enumerate(history, 1):
        print(f"  {DIM}{i:>2}.{RESET}  {entry}")
    print()


# ── Main loop ──────────────────────────────────────────────────────────────
def main():
    banner()
    history = []

    while True:
        try:
            raw = input(f"{CYAN}calc>{RESET} ").strip()
        except (EOFError, KeyboardInterrupt):
            print(f"\n{DIM}Goodbye!{RESET}")
            break

        if not raw:
            continue

        cmd = raw.lower()

        if cmd in ("q", "quit", "exit"):
            print(f"{DIM}Goodbye!{RESET}")
            break
        elif cmd == "help":
            help_menu()
        elif cmd == "history":
            show_history(history)
        elif cmd == "clear":
            os.system("cls" if os.name == "nt" else "clear")
            banner()
        else:
            result = calculate(raw, history)
            print(f"  = {result}\n")


if __name__ == "__main__":
    main()

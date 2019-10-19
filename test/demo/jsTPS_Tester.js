

/**
 * This driver demonstrates simple usage of the jTPS API.
 * 
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 2.0
 */
class jsTPS_Tester {
    // // HERE'S OUR TRANSACTION PROCESSING SYSTEM
    // static jTPS tps = new jTPS();
    
    // // HERE'S THE DATA WE'RE MANIPULATING IN THIS DEMO
    // static Num num = new Num();
    
    // // THESE ARE TO HELP WITH I/O
    // static Scanner input = new Scanner(System.in);
    // static PrintStream out = System.out;

    /**
     * This runs our demo program. Note that it presents a 
     * menu, retrieves the input, and executes the selected
     * behavior.
     * 
     * @param args Not used in this demo.
     */


    
    // public static void main(String[] args) {
    //     // LOOP FLAG VARIABLE
    //     boolean keepGoing = true;
    //     while (keepGoing) {
    //         // DISPLAY THE CURRENT TPS
    //         out.println("CURRENT jTPS:");
    //         out.println(tps);
    //         out.println();
            
    //         // DISPLAY NUM
    //         out.println("num is " + num.getNum());
    //         out.println();
            
    //         // DISPLAY THE MENU
    //         out.println("ENTER A SELECTION");
    //         out.println("1) Add a Transaction");
    //         out.println("2) Undo a Transaction");
    //         out.println("3) Redo a Transaction");
    //         out.println("4) Clear All Transactions");
    //         out.println("5) Reset Num and Transactions");
    //         out.print("-");

    //         // GET THE USER SELECTION
    //         String entry = input.nextLine();
            
    //         // ADD AND EXECUTE A TRANSACTION
    //         if (entry.startsWith("1")) {
    //             System.out.print("\nEnter an amount to add: ");
    //             entry = input.nextLine();
    //             int amountToAdd = Integer.parseInt(entry);
    //             jTPS_Transaction transaction = new AddToNum_Transaction(num, amountToAdd);
    //             tps.addTransaction(transaction);
    //         }            
    //         // UNDO A TRANSACTION
    //         else if (entry.startsWith("2")) {
    //             tps.undoTransaction();
    //         }
    //         // REDO A TRANSACTION
    //         else if (entry.startsWith("3")) {
    //             tps.doTransaction();
    //         }
    //         // CLEAR ALL TRANSACTIONS
    //         else if (entry.startsWith("4")) {
    //             tps.clearAllTransactions();
    //         }
    //         // CLEAR ALL TRANSACTIONS AND RESET NUM TO 0
    //         else if (entry.startsWith("5")) {
    //             tps.clearAllTransactions();
    //             num.setNum(0);
    //         }
    //         // QUIT
    //         else if (entry.startsWith("Q")) {
    //             keepGoing = false;
    //         }
    //     }
    //     System.out.println("GOODBYE");
    // }

    constructor()
    {
        this.tps = new jsTPS();
        this.num = new Num();
    }

    addBtnListener() {
        let btn = document.getElementById("tester_button");
        btn.addEventListener("click", this.add);
        let btn1 = document.getElementById("1", this.func1);
        btn1.addEventListener("click", this.func1);
        let btn2 = document.getElementById("2");
        btn2.addEventListener("click", this.func2);
        let btn3 = document.getElementById("3");
        btn3.addEventListener("click", this.func3);
        let btn4 = document.getElementById("4");
        btn4.addEventListener("click", this.func4);
        let btn5 = document.getElementById("5");
        btn5.addEventListener("click", this.func5);
    }
    
    // add
    func1 = () => {
        let btn = document.getElementById("tester_button");
        let input = document.getElementById("tester_input");
        input.disabled = false;
        btn.disabled = false;
    }

    add = () => {
        let btn = document.getElementById("tester_button");
        let input = document.getElementById("tester_input");
        let amount = Number(input.value);
        let result = document.getElementById("tester");
        let output = document.createElement("div");
        if (!Number.isInteger(amount))
        {
            output.innerHTML = "Tnvalid input!";
        }
        else {
            let addTrans = new AddToNum_Transaction(this.num, amount);
            this.tps.addTransaction(addTrans);
            output.innerHTML = amount+" added! Now we have "+this.num.num;
        }
        result.appendChild(output);
        input.disabled = true;
        btn.disabled = true;
        input.value = "";
    }

    func2 = () => {
        let btn = document.getElementById("tester_button");
        let input = document.getElementById("tester_input");
        let result = document.getElementById("tester");
        input.disabled = true;
        btn.disabled = true;
        let output = document.createElement("div");
        if (this.tps.mostRecentTransaction!==-1){
            this.tps.undoTransaction();
            output.innerHTML = "Transaction undone! Now we have "+this.num.num;
        }
        else
           output.innerHTML = "Can't undone anymore!";
        result.appendChild(output);
    }

    func3 = () => {
        let btn = document.getElementById("tester_button");
        let input = document.getElementById("tester_input");
        let result = document.getElementById("tester");
        input.disabled = true;
        btn.disabled = true;
        let output = document.createElement("div");
        if (this.tps.mostRecentTransaction<this.tps.transactions.length-1){
        this.tps.doTransaction();
        output.innerHTML = "Transaction redone! Now we have "+this.num.num;}
        else output.innerHTML = "Can't redone anymore!";
        result.appendChild(output);
    }
    
    func4 = () => {
        let btn = document.getElementById("tester_button");
        let input = document.getElementById("tester_input");
        let result = document.getElementById("tester");
        input.disabled = true;
        btn.disabled = true;
        this.tps.clearAllTransactions();
        let output = document.createElement("div");
        output.innerHTML = "All Transacions cleared! Now we have "+ this.num.num;
        result.appendChild(output);

    }

    func5 = () => {
        let btn = document.getElementById("tester_button");
        let input = document.getElementById("tester_input");
        let result = document.getElementById("tester");
        input.disabled = true;
        btn.disabled = true;
        this.tps.clearAllTransactions();
        this.num.num = 0;
        let output = document.createElement("div");
        output.innerHTML = "Num and transaction reset! Now we have 0!";
        result.appendChild(output);

    }



    // main () {
    //     //console.log(id);
    //     let result = document.getElementById("tester");
    //     let input = document.getElementById("tester_input");
    //     // console.log(decision);
    //     // let output = document.createElement('div');
    //     // switch(decision) {
    //     //     case "1":
    //     //         output.innerHTML = "Add a Transaction";
    //     //         break;
    //     //     case "2":
    //     //         output.innerHTML = "Undo a Transaction";
    //     //         break;
    //     //     case "3":
    //     //         output.innerHTML = "Redo a Transaction";
    //     //         break;
    //     //     case "4":
    //     //         output.innerHTML = "Clear All Transactions";
    //     //         break;
    //     //     case "5":
    //     //         output.innerHTML = "Reset Num and Transactions";
    //     //         break;
    //     //     default:
    //     //         output.innerHTML = "Wrong Choice!";
    //     // }
    //     // result.appendChild(output);
    //     // result.appendChild(document.createElement("br"));
    //     // input.innerHTML = "";  
    //     // console.log("tester");      
    // }
}
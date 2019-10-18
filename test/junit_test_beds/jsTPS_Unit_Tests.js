//import jsTPS from '../../src/jstps/jsTPS';
//import Num from '../demo/Num';

// import demo.AddToNum_Transaction;
//import AddToNum_Transaction from '../demo/AddToNum_Transaction';
// // import demo.AndMask_Transaction;
//import AndMask_Transaction from '../demo/AndMask_Transaction';

/**
 * jTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */
class AddToNum_Transaction{
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
   constructor (initNum, initAmountToAdd) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.amountToAdd = initAmountToAdd;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Add " + this.amountToAdd;
    }
}

class AndMask_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.andMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "And Mask " + this.mask;
    }
}

class OrMask_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.orMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Or Mask " + this.mask;
    }
}

class jsTPS_Unit_Tests {
    
    assertEquals(intOne, two, caseNum){
        let result = document.createElement("div");
        if (intOne===two){
            result.innerHTML = "assertEqual case #"+ caseNum +", test passed";
        }
        else{
            result.innerHTML = "assertEqual case #"+ caseNum +", test failed";
        }
        return result;
    }

    assertFalse(booleanOne,caseNum) {
        let result = document.createElement("div");
        if(!booleanOne) result.innerHTML = "assertFalse case #"+ caseNum +", test passed";
        else result.innerHTML = "assertFalse case #"+ caseNum +", test failed";
        return result;
    }

    assertTrue(booleanOne, caseNum) {
        let result = document.createElement("div");
        if(booleanOne) result.innerHTML = "assertTrue case #"+ caseNum +", test passed";
        else result.innerHTML = "assertTrue case #"+ caseNum +", test failed";
        return result;
    }


    /**
     * This JUnit test is for testing the adding of transactions.
     */
    //@Test
    testAdd(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        let testAdd = document.createElement("div");
        testAdd.innerHTML = "test add:";
        result.appendChild(testAdd);

        let caseNum = 1;
        result.appendChild(this.assertEquals(0, num.getNum(),caseNum++));
        
        // ADD 5 TRANSACTION
        let addToNum = new AddToNum_Transaction(num, 5)
        tps.addTransaction(addToNum);
        result.appendChild(this.assertEquals(5, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getUndoSize(),caseNum++));
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        result.appendChild(this.assertEquals(15, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getUndoSize(),caseNum++));
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        result.appendChild(document.createElement("br"));
    }
    
    /**
     * 
     */
    //@Test
    testAndMask(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        let testAdd = document.createElement("div");
        testAdd.innerHTML = "test andMask:";
        result.appendChild(testAdd);

        let caseNum=1;
        result.appendChild(this.assertEquals(0, num.getNum(),caseNum++));
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        result.appendChild(this.assertEquals(4, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getSize(),caseNum++));
        
        tps.undoTransaction();
        result.appendChild(this.assertEquals(12, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getUndoSize(),caseNum++));
        result.appendChild(document.createElement("br"));

    }
    
    testOrMask(result) {
        let tps = new jsTPS();
        let num = new Num();
        let testAdd = document.createElement("div");
        testAdd.innerHTML = "test orMask:";
        result.appendChild(testAdd);

        let caseNum=1;
        result.appendChild(this.assertEquals(0, num.getNum(),caseNum++));
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 4));
        result.appendChild(this.assertEquals(12, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getSize(),caseNum++));
        
        tps.undoTransaction();
        result.appendChild(this.assertEquals(12, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getUndoSize(),caseNum++));
        result.appendChild(document.createElement("br"));
        
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    //@Test
    testUndo(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        let testAdd = document.createElement("div");
        testAdd.innerHTML = "test Undo";
        result.appendChild(testAdd);
        let caseNum = 1;
        result.appendChild(this.assertEquals(num.getNum(), 0,caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(15, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getUndoSize(),caseNum++));
        
        // UNDO ANOTHER
        tps.undoTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(5, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getUndoSize(),caseNum++));
        
        // AND ANOTHER
        tps.undoTransaction();
        result.appendChild(this.assertFalse(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(0, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getUndoSize(),caseNum++));
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        result.appendChild(this.assertFalse(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(0, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getUndoSize(),caseNum++));
        result.appendChild(document.createElement("br"));
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTIN
        let tps = new jsTPS();
        let num = new Num();
        let testAdd = document.createElement("div");
        testAdd.innerHTML = "test Redo:";
        result.appendChild(testAdd);

        let caseNum = 1;
        result.appendChild(this.assertEquals(num.getNum(), 0,caseNum++));
 
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(15, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(1, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(2, tps.getUndoSize(),caseNum++));
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo(),caseNum++));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo(),caseNum++));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        result.appendChild(document.createElement("br"));
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    //@Test
    testClear(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        let testAdd = document.createElement("div");
        testAdd.innerHTML = "test clear:";
        result.appendChild(testAdd);
        let caseNum = 1;
        result.appendChild(this.assertEquals(num.getNum(), 0,caseNum++));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        result.appendChild(this.assertEquals(35, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getUndoSize(),caseNum++));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(70, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        result.appendChild(this.assertEquals(70, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getUndoSize(),caseNum++));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(105, num.getNum(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getSize(),caseNum++));
        result.appendChild(this.assertEquals(0, tps.getRedoSize(),caseNum++));
        result.appendChild(this.assertEquals(3, tps.getUndoSize(),caseNum++));
        result.appendChild(document.createElement("br"));
    }


    main(id) {
        let result = document.getElementById(id);
        this.testAdd(result);
        this.testAndMask(result);
        this.testOrMask(result);
        this.testUndo(result);
        this.testRedo(result);
        this.testClear(result);
        let end = document.createElement("div");
        end.innerHTML = "-------End of jsTPS Unit Tests-------";
        result.appendChild(end);
        console.log("success");
    };
}




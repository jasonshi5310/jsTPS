

// import demo.AddToNum_Transaction;
// import AddToNum_Transaction from '../demo/AddToNum_Transaction';
// // import demo.AndMask_Transaction;
// import AndMask_Transaction from '../demo/AndMask_Transaction';

/**
 * jTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */

class jsTPS_Unit_Tests {
    
    assertEquals(intOne, two){
        let result = document.createElement("div");
        if (intOne===two){
            result.innerHTML = "test passed";
        }
        else{
            result.innerHTML = "test failed";
        }
        return result;
    }

    assertFalse(booleanOne) {
        let result = document.createElement("div");
        if(!booleanOne) result.innerHTML = "test passed";
        else result.innerHTML = "test failed";
        return result;
    }

    assertTrue(booleanOne) {
        let result = document.createElement("div");
        if(booleanOne) result.innerHTML = "test passed";
        else result.innerHTML = "test failed";
        return result;
    }


    /**
     * This JUnit test is for testing the adding of transactions.
     */
    //@Test
    testAdd(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps;// = new jsTPS();
        let num;// = new Num();
        result.appendChild(this.assertEquals(0, num.getNum()));
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        result.appendChild(this.assertEquals(5, num.getNum()));
        result.appendChild(this.assertEquals(1, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(1, tps.getUndoSize()));
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        result.appendChild(this.assertEquals(15, num.getNum()));
        result.appendChild(this.assertEquals(2, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(2, tps.getUndoSize()));
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
    }
    
    /**
     * 
     */
    //@Test
    testAndMask(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps;
        let num;
        result.appendChild(this.assertEquals(0, num.getNum()));
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        result.appendChild(this.assertEquals(4, num.getNum()));
        result.appendChild(this.assertEquals(2, tps.getSize()));
        
        tps.undoTransaction();
        result.appendChild(this.assertEquals(12, num.getNum()));
        result.appendChild(this.assertEquals(2, tps.getSize()));
        result.appendChild(this.assertEquals(1, tps.getRedoSize()));
        result.appendChild(this.assertEquals(1, tps.getUndoSize()));

    }
    
    testOrMask(result) {
        
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    //@Test
    testUndo(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let num;
        let tps;
        result.appendChild(this.assertEquals(num.getNum(), 0));
        result.appendChild(this.assertFalse(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(15, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(1, tps.getRedoSize()));
        result.appendChild(this.assertEquals(2, tps.getUndoSize()));
        
        // UNDO ANOTHER
        tps.undoTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(5, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(2, tps.getRedoSize()));
        result.appendChild(this.assertEquals(1, tps.getUndoSize()));
        
        // AND ANOTHER
        tps.undoTransaction();
        result.appendChild(this.assertFalse(tps.hasTransactionToUndo()));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(0, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(3, tps.getRedoSize()));
        result.appendChild(this.assertEquals(0, tps.getUndoSize()));
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        result.appendChild(this.assertFalse(tps.hasTransactionToUndo()));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(0, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(3, tps.getRedoSize()));
        result.appendChild(this.assertEquals(0, tps.getUndoSize()));
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTIN
        let tps;
        let num;
        result.appendChild(this.assertEquals(num.getNum(), 0));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertTrue(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(15, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(1, tps.getRedoSize()));
        result.appendChild(this.assertEquals(2, tps.getUndoSize()));
        
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
        result.appendChild(this.assertTrue(tps.hasTransactionToUndo()));
        result.appendChild(this.assertFalse(tps.hasTransactionToRedo()));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    //@Test
    testClear(result) {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps;
        let num;
        this.assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        result.appendChild(this.assertEquals(35, num.getNum()));
        result.appendChild(this.assertEquals(0, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(0, tps.getUndoSize()));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(70, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        result.appendChild(this.assertEquals(70, num.getNum()));
        result.appendChild(this.assertEquals(0, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(0, tps.getUndoSize()));
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        result.appendChild(this.assertEquals(105, num.getNum()));
        result.appendChild(this.assertEquals(3, tps.getSize()));
        result.appendChild(this.assertEquals(0, tps.getRedoSize()));
        result.appendChild(this.assertEquals(3, tps.getUndoSize()));
    }

    main(id) {
        let result = document.getElementById(id);
        this.testAdd(result);
        this.testAndMask(result);
        this.testOrMask(result);
        this.testUndo(result);
        this.testRedo(result);
        this.testClear(result);
        console.log("success");
    }
}
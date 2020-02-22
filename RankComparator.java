package HW7;

/**
* This <code>RankComparator</code> class sort numerically DESCENDING based
* on the PageRank of the WebPage.
*
* @author Minqi Shi
* email: minqi.shi@stonybrook.edu
* Stony Brook ID: 111548035
**/
import java.util.*;

public class RankComparator implements Comparator
{
	public int compare(Object o1, Object o2) 
    {
        WebPage first = (WebPage) o1;
        WebPage second = (WebPage) o2;
        if (first.getRank() == second.getRank())
        {
            if(first.getIndex()<second.getIndex())
                return -1;
            else if(first.getIndex()>second.getIndex())
                return 1;
            else
                return 0;
        }  
        else if (first.getRank() > second.getRank())
            return -1;
        else
            return 1;
    }
}
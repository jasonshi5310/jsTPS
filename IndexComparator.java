package HW7;

/**
* This <code>IndexComparator</code> class sort numerically ASCENDING based
* on index of the WebPage
*
* @author Minqi Shi
* email: minqi.shi@stonybrook.edu
* Stony Brook ID: 111548035
**/
import java.util.*;

public class IndexComparator implements Comparator
{
    public int compare(Object o1, Object o2) 
    {
        WebPage first = (WebPage) o1;
        WebPage second = (WebPage) o2;
        if (first.getIndex() == second.getIndex())
            return 0;
        else if (first.getIndex() > second.getIndex())
            return 1;
        else
            return -1;
    }
}
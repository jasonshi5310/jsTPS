package HW7;

/**
* This <code>URLComparator</code> class sort alphabetically ASCENDING
* based the URL of the WebPage
*
* @author Minqi Shi
* email: minqi.shi@stonybrook.edu
* Stony Brook ID: 111548035
**/
import java.util.*;

public class URLComparator implements Comparator
{
    public int compare(Object o1, Object o2) 
    {
        WebPage first = (WebPage) o1;
        WebPage second = (WebPage) o2;
        return (first.getUrl().compareTo(second.getUrl()));
    }
}
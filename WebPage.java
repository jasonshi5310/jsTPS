package HW7;

/**
* This <code>WebPage</code> class represents a hyperlinked document. 
*
* @author Minqi Shi
* email: minqi.shi@stonybrook.edu
* Stony Brook ID: 111548035
**/
import java.util.*;
public class WebPage implements Comparable
{
    /**
    * Returns an instance of WebPage Class.
    **/
    public WebPage()
    {
        this.index = 0;
        this.rank = 0;
        this.keywords = new ArrayList<>();
    }
    
    public int compareTo(Object o) {
        WebPage otherWeb = (WebPage)o;
        if (this.rank == otherWeb.rank)
            return 0;
        else if (this.rank > otherWeb.rank)
            return 1;
        else
            return -1;
        }

    private String url;
    private int index;
    private int rank;
    private ArrayList<String> keywords;

    /**
    * Returns the url of the web.
    *
    * @return 
    *    the url.
    **/
    public String getUrl()
    {
        return url;
    }

    /**
    * Returns the index of the webpage.
    *
    * @return
    *    The index.
    **/
    public int getIndex()
    {
        return index;
    }

    /**
    * Returns the rank of the webpage.
    * 
    * @return
    *    the rank.
    **/
    public int getRank()
    {
        return rank;
    }

    /**
    * Returns teh keywords of the webpage.
    *
    * @return
    *    the keywords.
    **/
    public ArrayList<String> getKeyWords()
    {
        return keywords;
    }

    /**
    * Sets a new url for the webpage.
    *
    * @param newUrl
    *    The new url.
    **/
    public void setUrl(String newUrl)
    {
        this.url = newUrl;
    }

    /**
    * Sets a new index for the webpage.
    *
    * @param newIndex
    *    The new Index for the web page.
    **/
    public void setIndex(int newIndex)
    {
        this.index = newIndex;
    }

    /**
    * Set a new rank for the webpage.
    *
    * @param newRank
    *    The new rank for the web.
    **/
    public void setRank(int newRank)
    {
        this.rank = newRank;
    }

    /**
    * Sets a new KeyWords for the web.
    *
    * @param newKeyWords
    *    The new KeyWords for the web.
    **/
    public void setKeyWords(ArrayList<String> newKeyWords)
    {
        this.keywords = newKeyWords;
    }

    /**
    * Returns string of data members in tabular form.
    * Note 1: Since we cannot determine the "Links" portion of this WebPage,
    * we will substitute it for a dummy String. For example, we can use "***"
    * (or anything that is unique). A sample result would be:
    * 0   | google.com         |***| search, knowledge, tech
    * In the WebGraph class, when we want to print, we will determine all 
    * the Links for the URL "google.com" and can use the String.replace()
    * method to replace your unique String (e.g. ***) with the correct values.
    * 
    * @return 
    *    The string represent the web page.
    **/
    public String toString()
    {
        String web = String.format("  %-4d| %-19s|    %-5d| *** | ",
          index, url, rank);
        int i = 0;
        String keyword = "";
        while(i<keywords.size())
        {
            keyword += keywords.get(i++) + ", ";
            if(i==keywords.size())
                keyword = keyword.substring(0,keyword.length()-2);
        }
        web += keyword;
        return web;
    }
}
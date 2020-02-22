package HW7;

/**
* This <code>WebGraph</code> class organizes the WebPage objects as a
* directed graph.
*
* @author Minqi Shi
* email: minqi.shi@stonybrook.edu
* Stony Brook ID: 111548035
**/
import java.io.*;
import java.util.*;

public class WebGraph
{
    public static final int MAX_PAGES = 40;
    private ArrayList<WebPage> pages;
    private int[][] edges = new int[MAX_PAGES][MAX_PAGES]; 

    /**
    * Returns the pages.
    *
    * @return 
    *    the pages.
    **/
    public ArrayList<WebPage> getPages()
    {
        return pages;
    }

    /**
    * Returns the edges(links).
    *
    * @return 
    *    the edges.
    **/
    public int[][] getEdges()
    {
        return edges;
    }

    /**
    * Sets a new pages.
    *
    * @param newPages
    *    The new pages.
    **/
    public void setPages(ArrayList<WebPage> newPages)
    {
        this.pages = newPages;
    }

    /**
    * Sets a new edges(links).
    *
    * @param newEdges
    *    The new edges.
    **/
    public void setEdges(int[][] newEdges)
    {
        this.edges = newEdges;
    }

    /**
    * Constructs a WebGraph object using the indicated files as the source
    * for pages and edges.
    *
    * @param pagesFile 
    *    String of the relative path to the file containing the page
    *    information.
    *
    * @param linksFile 
    *    String of the relative path to the file containing the link
    *    information.
    *
    * <dt>Preconditions
    *    <dd> Both parameters reference text files which exist.
    *    The files follow proper format as outlined in the "Reading Graph
    *    from File" section below.
    *
    * <dt>Postconditions:
    *    <dd> A WebGraph has been constructed and initialized based on the
    *    text files.
    *
    * @return
    *    The WebGraph constructed from the text files.
    *
    * @throws IllegalArgumentException
    *    Thrown if either of the files does not reference a valid text file,
    *    or if the files are not formatted correctly.
    *
    * Note:
    * See the section "Reading Graph from File" below for information on how 
    * to construct the graph using two files.
    **/
    public static WebGraph buildFromFiles(String pagesFile, String linksFile)
      throws IllegalArgumentException
    {
        if(!new File(pagesFile).exists()|!new File(linksFile).exists())
            throw new IllegalArgumentException();
        try
        {
            FileInputStream fisPage = new FileInputStream(pagesFile);
            InputStreamReader inStream = new InputStreamReader(fisPage);
            BufferedReader reader = new BufferedReader(inStream);
            WebGraph graph = new WebGraph();
            String data = reader.readLine();
            int index = 0;
            while(data!=null)
            {
                data = data.trim();
                WebPage current = new WebPage();
                current.setUrl(data.substring(0,data.indexOf(" ")));
                String words = data.substring(data.indexOf(" ")+1);
                ArrayList<String> keywords = new ArrayList<>();
                while(!words.equals(""))
                {
                    if(words.contains(" "))
                    {
                        keywords.add(words.substring(0,words.indexOf(" ")));
                        words = words.substring(words.indexOf(" ")+1);
                    }
                    if(!words.contains(" "))
                    {
                        keywords.add(words);
                        words = "";
                    }
                }
                current.setKeyWords(keywords);
                current.setIndex(index++);
//                System.out.print(graph.getPages()==null);
//                System.exit(0);
                if(graph.getPages()==null)
                {
                    ArrayList<WebPage> temp = new ArrayList<>();
                    temp.add(current);
                    graph.setPages(temp);
                }
                else
                {
                    graph.getPages().add(current);
                }
                data = reader.readLine();
            }
            FileInputStream fisLink = new FileInputStream(linksFile);
            inStream = new InputStreamReader(fisLink);
            reader = new BufferedReader(inStream);
            data = reader.readLine();
            while(data!=null)
            {
                data = data.trim();
              // System.out.println(data);
                String begPage = data.substring(0,data.indexOf(" "));
                String desPage = data.substring(data.indexOf(" ")+1);
                int begPos = -1;
                int desPos = -1;
                for(WebPage web: graph.getPages())
                {
                    if(web.getUrl().equals(begPage))
                        begPos = web.getIndex();
                    else if(web.getUrl().equals(desPage))
                        desPos = web.getIndex();
                }
                if(begPos != -1 && begPos != desPos && desPos != -1)
                {
                    graph.getEdges()[begPos][desPos] = 1;
                    WebPage desti = graph.getPages().get(desPos);
                    desti.setRank(desti.getRank()+1);
                }
                data = reader.readLine();
            }
            System.out.println("Success!");
            return graph;
        }
        catch(FileNotFoundException fnfe)
        {
            System.out.println("Cannot find the file.");
        }
        catch(IOException ioe)
        {
            System.out.println("IOException thrown.");
        }
        return null;
    }
    
    /**
    * Adds a page to the WebGraph.
    *
    * @param url
    *    The URL of the webpage (must not already exist in the WebGraph).
    *
    * @param keywords
    *   The keywords associated with the WebPage.
    *
    * <dt>Preconditions:
    *    <dd> url is unique and does not exist as the URL of a WebPage 
    *    already in the graph. url and keywords are not null.
    *
    * <dt>Postconditions:
    *    <dd> The page has been added to pages at index 'i' and links
    *    has been logically extended to include the new row and column
    *    indexed by 'i'.
    *
    * @throws IllegalArgumentException
    * If url is not unique and already exists in the graph, or if either
    * argument is null.
    * 
    * @throws DuplicateException
    *     if the url is not unique.
    **/
    public void addPage(String url, ArrayList<String> keywords) 
      throws IllegalArgumentException, DuplicateException
    {
        if(url==null | keywords== null)
            throw new IllegalArgumentException();
        for(WebPage page : pages)
        {
            if(page.getUrl().equals(url))
            {
                System.out.print("Error: "+url);
                throw new DuplicateException();
            }
        }
        WebPage web = new WebPage();
        web.setUrl(url);
        web.setKeyWords(keywords);
        web.setIndex(pages.size());
        pages.add(web);
    }

    /**
    * Adds a link from the WebPage with the URL indicated by source to
    * the WebPage with the URL indicated by destination
    *
    * @param source 
    *    the URL of the page which contains the hyperlink to destination.
    * 
    * @param destination 
    *    the URL of the page which the hyperlink points to.
    *
    * <dt>Preconditions:
    *    <dd>Both parameters reference WebPages which exist in the graph.
    *
    * @throws IllegalArgumentException
    * If either of the URLs are null or could not be found in pages.
    **/
    public void addLink(String source, String destination)
      throws IllegalArgumentException
    {
        if(source==null | destination == null )   
        {
            System.out.println("Error: source and destination can't be null.");
            return;
        }
        if(source.equals(destination))
        {
            System.out.println("Error: source and destination "
              + "can't be the same");
            return;
        }
        boolean ifSourceExist = false;
        boolean ifDestiExist = false;
        int sourcePos = -1;
        int destiPos = -1;
        for(WebPage page: pages)
        {
            if(page.getUrl().equals(source))
            {
                sourcePos = page.getIndex();
                ifSourceExist = true;
            }
            if(page.getUrl().equals(destination))
            {
                destiPos = page.getIndex();
                ifDestiExist = true;
            }
        }
        if(!ifSourceExist&&!ifDestiExist)
        {
            System.out.print("Error: both "+ source+" and "+destination);
            throw new IllegalArgumentException();
        }
        else if(!ifSourceExist)
        {
            System.out.print("Error: "+source);
            throw new IllegalArgumentException();
        }
        else if(!ifDestiExist)
        {
            System.out.print("Error: "+destination);
            throw new IllegalArgumentException();
        }
        edges[sourcePos][destiPos] = 1;
        pages.get(destiPos).setRank(pages.get(destiPos).getRank()+1);
        System.out.println("\nLink successfully added from "
          + source+" to "+destination+"\n");
    }

    /**
    * Removes the WebPage from the graph with the given URL.
    *
    * @param url
    *    The URL of the page to remove from the graph.
    *
    * <dt>Postconditions:
    *    <dd> The WebPage with the indicated URL has been removed from
    *    the graph, and it's corresponding row and column has been removed
    *    from the adjacency matrix. All pages that has an index greater than
    *    the index that was removed should decrease their index value by 1.
    *    If url is null or could not be found in pages, the method ignores
    *    the input and does nothing.
    *
    * Note:
    *     When the page is removed, it's corresponding row and column must
    *     be removed from the adjacency matrix. This can be accomplished by
    *     copying links[k][j+1] to links[k][j] and links[j+1][k] to
    *     links[j][k] for 0 ≤ k < size(pages) and i ≤ j < size(pages)-1
    **/
    public void removePage(String url)
    {
        boolean urlExist = false;
        int urlPos = -1;
        for(WebPage page: pages)
        {
            if(page.getUrl().equals(url))
            {
                urlPos = page.getIndex();
                urlExist = true;
            }
        }
        if(url==null|!urlExist)
        {
            System.out.println(url + " could not be found in the WebGraph.");
            return;
        }
        // decrement the index
        for(int i = urlPos+1;i<pages.size();i++)
        {
            pages.get(i).setIndex(pages.get(i).getIndex()-1);
        }
        pages.remove(urlPos);
        // move up and left
        for(int i = urlPos;i<pages.size()+1;i++)
            for (int j = 0;j<urlPos;j++)
            {
                edges[j][i] = edges[j][i+1];
                edges[i][j] = edges[i+1][j];
            }
        // move diagonally
        for (int i = urlPos;i<pages.size()+1;i++)
            for (int j = urlPos;j<pages.size();j++)
            {
                edges[i][j] = edges[i+1][j+1];
            }
        // clear up the removed column and row.
        for (int i = pages.size();i<pages.size()+1;i++)
            for(int j = 0;j<pages.size()+1;j++)
            {
                edges[i][j] = 0;
                edges[j][i] = 0;
            }
        updatePageRanks();
        System.out.println(url + " has been removed from the graph!\n");
    }

    /**
    * Removes the link from WebPage with the URL indicated by source to the
    * WebPage with the URL indicated by destination.
    *
    * @param source
    *    The URL of the WebPage to remove the link.
    *
    * @param destination
    *    The URL of the link to be removed.
    *
    * <dt>Postconditions:
    *    <dd>The entry in links for the specified hyperlink has been set to
    *    0 (no link). If either of the URLs could not be found, the input is
    *    ignored and the method does nothing.
    **/
    public void removeLink(String source, String destination)
    {
        if(source==null|destination==null)
        {
            System.out.println("Erorr: Source and destination could"
              + " not be null.");
            return;
        }
        if(source.equals(destination))
        {
            System.out.println("Erorr: Source and destination could"
              + " not be the same.");
            return;
        }
        int sourcePos = -1;
        int destiPos = -1;
        for(WebPage page: pages)
        {
            if(page.getUrl().equals(source))
                sourcePos = page.getIndex();
            else if(page.getUrl().equals(destination))
                destiPos = page.getIndex();
        }
        if(sourcePos==-1&&destiPos ==-1)
        {
            System.out.println("Erorr: both "+source+" and "+destination
              + " could not be found in the WebGraph.");
            return;    
        }
        else if(sourcePos==-1)
        {
            System.out.println("Error: "+source
              + " could not be found in the WebGraph.");
            return;
        }        
        else if(destiPos == -1)
        {
            System.out.println("Error: "+destination
              + " could not be found in the WebGraph.");
            return;
        }
        // pages.get(destiPos).setRank(pages.get(destiPos).getRank()-1);
        edges[sourcePos][destiPos] = 0;
        updatePageRanks();
        System.out.println("Link removed from "
          + source + " to " + destination + "!\n");
    }

    /**
    * Calculates and assigns the PageRank for every page in the WebGraph
    * (see the PageRank Algorithm section for further detail).
    * Note: This operation should be performed after ANY alteration
    * of the graph structure (adding/removing a link, adding/removing a page).
    *
    * <dt>Postconditions:
    *    <dd>All WebPages in the graph have been assigned 
    *    their proper PageRank.
    **/
    public void updatePageRanks()
    {
        for(int i = 0;i<pages.size();i++)
        {
            int rank = 0;
            for (int j = 0;j<pages.size();j++)
            {
                if(edges[j][i]==1)
                    rank++;
            }
            pages.get(i).setRank(rank);
        }
    }

    /**
    * Prints the WebGraph in tabular form 
    * (see sample I/O for more information).
    **/
    public void printTable()
    {
        System.out.println("Index     URL               PageRank  Links"
          +"               Keywords");
        System.out.println("-------------------------------------------"
          +"--------------------------------------------------------");
        for(WebPage page: pages)
        {
            String links = "";
            String pageStr = page.toString();
            for(int i = 0;i<pages.size();i++)
            {
                if(edges[page.getIndex()][i]==1)
                    links = links + i +", ";
            }
            if(links.contains(", "))
                links = links.substring(0,links.length()-2);
            links = String.format("%-17s", links);
            pageStr = pageStr.replace("***",links);
            System.out.println(pageStr);
        }
    }

    /**
    * Searches through the pages by a keyword and returns a WebPage arrayList
    * numerically DESCENDING based on the PageRank of each WebPage.
    *
    * @param keyword
    *    The keyword of the page we are searching for.
    *
    * @return
    *    a WebPage arrayList containing the results. 
    **/
    public ArrayList<WebPage> search(String keyword)
    {
        ArrayList<WebPage> searchList = new ArrayList<>();
        for(WebPage page : pages)
        {
            ArrayList<String> words = page.getKeyWords();
            for(int i = 0;i<words.size();i++)
            {
                if(words.get(i).equals(keyword)&&searchList.isEmpty())
                {
                    searchList.add(page);
                    break;
                }
                else if(words.get(i).equals(keyword))
                {
                    int insertPos = 0;
                    for(int j = 0;j<searchList.size();j++)
                    {
                        if(searchList.get(j).getRank()>=page.getRank())
                            insertPos++;
                    }
                    searchList.add(insertPos, page);
                    break;
                }
            }
        }
        return searchList;
    }
}

class DuplicateException extends Exception
{
    
}
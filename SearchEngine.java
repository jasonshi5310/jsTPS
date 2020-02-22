package HW7;

/**
* This <code>SearchEngine</code> class initialize a WebGraph from the
* appropriate text files and allow the user to search for keywords
* in the graph.
*
* @author Minqi Shi
* email: minqi.shi@stonybrook.edu
* Stony Brook ID: 111548035
**/
import java.util.*;

public class SearchEngine
{
    public static final String PAGES_FILE = "pages.txt";
    public static final String LINKS_FILE = "links.txt";
    private static WebGraph web;

    /**
    * Provide a menu prompt and implement the following menu options:
        (AP) - Add a new page to the graph.
        (RP) - Remove a page from the graph.
        (AL) - Add a link between pages in the graph.
        (RL) - Remove a link between pages in the graph.
        (P) - Print the graph.
        (I) Sort based on index (ASC)
        (U) Sort based on URL (ASC)
        (R) Sort based on rank (DSC)
        (S) - Search for pages with a keyword.
        (Q) - Quit.
    **/
    public static void main(String[] args)
    {
        Scanner stdin = new Scanner(System.in);
        String command = "";
        System.out.println("Loading WebGraph data...");
        try
        {
            web = WebGraph.buildFromFiles(PAGES_FILE, LINKS_FILE);
        }
        catch(IllegalArgumentException iae)
        {
            System.out.println("Initial files don't exist. Please check"
              + " them and come back.");
            System.exit(0);
        }
        while(!command.equals("Q"))
        {
            try
            {
                System.out.println("Menu:"
                    +"\n    (AP) - Add a new page to the graph."
                    +"\n    (RP) - Remove a page from the graph."
                    +"\n    (AL) - Add a link between pages in the graph."
                    +"\n    (RL) - Remove a link between pages in the graph."
                    +"\n    (P)  - Print the graph."
                    +"\n    (S)  - Search for pages with a keyword."
                    +"\n    (Q)  - Quit.\n");
                System.out.print("Please select an option: ");
                command = stdin.nextLine();
                switch(command)
                {
                    case("AP"): //(AP) - Add a new page to the graph.
                        System.out.print("Enter a URL: ");
                        String urlAP = stdin.nextLine();
                        if(!urlAP.contains("."))
                        {
                            System.out.println("Erorr: URL is not in "
                              + "the correct form.\n");
                            break;
                        }
                        System.out.print("Enter keywords (space-separated): ");
                        String wordsAP = stdin.nextLine();
                        ArrayList<String> keywordsAp = new ArrayList<>();
                        while(!wordsAP.equals(""))
                        {
                            if (wordsAP.contains(" ")) 
                            {
                                keywordsAp.add(wordsAP.substring(0 
                                  , wordsAP.indexOf(" ")));
                                wordsAP = wordsAP.substring
                                  (wordsAP.indexOf(" ")+1); 
                            }
                            if(!wordsAP.contains(" "))
                            {
                                keywordsAp.add(wordsAP);
                                wordsAP = "";
                            }
                        }
                        try
                        {
                            web.addPage(urlAP, keywordsAp);
                            System.out.println("\n"+urlAP 
                              + " successuflly added to the WebGraph!\n");
                        }
                        catch(IllegalArgumentException iae)
                        {
                            System.out.println("Error: "
                              + "Url or keywords is null.");
                        }
                        
                    break;
                    case("RP"): //(RP) - Remove a page from the graph.
                        System.out.print("Enter a URL: ");
                        String urlRP = stdin.nextLine();
                        web.removePage(urlRP);
                    break;
                    case("AL"): //(AL) - Add a link between pages in the graph.
                        System.out.print("Enter a source URL: ");
                        String source = stdin.nextLine().trim();
                        System.out.print("Enter a destination URL: ");
                        String destination = stdin.nextLine().trim();
                        web.addLink(source, destination);
                    break;
                    //(RL) - Remove a link between pages in the graph.
                    case("RL"): 
                        System.out.print("Enter a source URL: ");
                        String sourceUrl = stdin.nextLine();
                        System.out.print("Enter a destination URL: ");
                        String destiUrl = stdin.nextLine();
                        web.removeLink(sourceUrl, destiUrl);
                    break;
                    case("P"): //(P) - Print the graph.
                        System.out.println(
                             "\n    (I) Sort based on index (ASC)"
                           + "\n    (U) Sort based on URL (ASC)"
                           + "\n    (R) Sort based on rank (DSC)\n");
                        System.out.print("Please select an option: ");
                        String printType = stdin.nextLine();
                        switch(printType)
                        {
                            case("I"): //(I) Sort based on index (ASC)
                                Collections.sort(web.getPages(), 
                                  new IndexComparator());
                                web.printTable();
                            break;
                            case("U"): //(U) Sort based on URL (ASC)
                                Collections.sort(web.getPages(),
                                  new URLComparator());
                                web.printTable();
                            break;
                            case("R"): //(R) Sort based on rank (DSC)
                            Collections.sort(web.getPages(),
                              new RankComparator());
                            web.printTable();
                            break;
                            default:
                                System.out.println("Unrecognized command.");
                        }
                        System.out.println();
                    break;
                    case("S"): //Search for pages with a keyword.
                        System.out.print("Search keyword: ");
                        String keyword = stdin.nextLine().trim();
                        System.out.println();
                        ArrayList<WebPage> searchList = web.search(keyword);
                        if(!searchList.isEmpty())
                        {
                            System.out.println("Rank   PageRank    URL\n"
                              +"----------------------------------------"
                              +"-----");
                            for(int i = 0;i<searchList.size();i++)
                            {
                                System.out.printf("  %-3d|     %-6d| %s\n",
                                  i+1,
                                  searchList.get(i).getRank(),
                                  searchList.get(i).getUrl());
                            }                            
                        }
                        else
                        {
                            System.out.println("No search "
                              + "results found for the"
                              + " keyword "+keyword+".");
                        }
                        System.out.println();
                    break;
                    default:
                        if(!command.equals("Q"))
                        {
                            System.out.println("Unrecognized command.");
                        }
                }
            }
            catch(InputMismatchException ime)
            {
                System.out.println("Please input in the correct form.");
            }
            catch(IllegalArgumentException iae)
            {
                System.out.println(" could not be found in the WebGraph.");
            }
            catch(DuplicateException de)
            {
                System.out.println(" already exists in the WebGraph."
                  + " Could not add new WepPage.");
            }
        }
        System.out.println("\nGoodbye.");
    }
}
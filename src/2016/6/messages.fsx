open System

printf "Enter data, end with a single line break:\n"
let mutable input = null

// read data
let Data = [| while input <> "" do
                input <- Console.ReadLine()
                yield input |]

// // print the data
// printf "This is the data we have:\n"
// for d in Data do
//   printfn "%s" d

// converts characters to an integer representation
let Value (c:char) = (int c) - (int 'a') 
let Character (i:int) = (char) (i + (int 'a'))

let LongestString (array : string[]) = (array |> Array.map (fun x -> x.Length) |> Array.max) 
// initialize matrix
let matrix = Array2D.init<int> (LongestString Data) (Value 'z' + 1) ( fun a b -> 0)

// Convert to a matrix of counts
for d in Data do
  for i: int in 0 .. d.Length - 1 do
    let ch = d.[i]
    matrix.[i, (Value ch)] <- matrix.[i, (Value ch)] + 1

let result: char[] = [| for i in 0 .. (LongestString Data) - 1 do
                          yield Character (matrix.[i,*] 
                            |> Array.mapi (fun i x -> i , x)  
                            |> Array.maxBy snd 
                            |> fst) |]

printfn "The result is:"
result |> System.String |> printfn "%A" 

// the same but remove zeroes and sort by min
let result2: char[] = [| for i in 0 .. (LongestString Data) - 1 do
                          yield Character (matrix.[i,*] 
                            |> Array.mapi (fun i x -> i , x)  
                            |> Array.filter (fun x -> snd x > 0 ) 
                            |> Array.minBy snd
                            |> fst) |]

printfn "The second result is:"
result2 |> System.String |> printfn "%A" 

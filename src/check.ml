(* Type checker *)
open Printf
open Ast
open Util

exception TypeException of string



let gamma = HashSet.make ()

let check_vec (v: vec) : unit = ()

let check_mat (m: mat) : unit = ()
    
let rec check_ltyp (lt: ltyp) : unit =
    match lt with
    | VecTyp n -> if n < 0 then 
        (raise (TypeException "vec dimensions must be positive"))
    | MatTyp (n1, n2) -> if n1 < 0 || n2 < 0 then
        (raise (TypeException "mat dimensions must be positive"))
    | TagTyp s -> (let is_mem = HashSet.mem gamma s in 
        if not is_mem then (raise (TypeException "tag must be defined")
        ))
    | TransTyp (lt1, lt2) -> ()

let rec check_atyp (at: atyp) : typ = 
    match at with
    | IntTyp -> failwith "Unimplemented"
    | FloatTyp -> failwith "Unimplemented"
    | LTyp lt -> failwith "Unimplemented"

let rec check_btyp (bt: btyp) : typ = failwith "Unimplemented"

let rec check_typ (t: typ) : typ = 
    match t with
    | ATyp at -> check_atyp at
    | BTyp bt -> check_btyp bt

let rec check_exp (e: exp) : unit = 
    match e with
    | Bool b -> failwith "Unimplemented"
    | Aval a -> failwith "Unimplemented"
    | Var v -> ()
    | Lexp (a',l) -> failwith "Unimplemented"
    | Norm a -> check_exp a
    | Dot (a1, a2)
    | Plus (a1, a2)
    | Times (a1, a2)
    | Minus (a1, a2)
    | CTimes (a1, a2) -> check_exp a1; check_exp a2 
    | Eq (a1, a2)
    | Leq (a1, a2) -> check_exp a1; check_exp a2
    | Or (b1, b2)
    | And (b1, b2) -> check_exp b1; check_exp b2
    | Not b' -> check_exp b'

let rec check_comm (c: comm) : unit =
    match c with
    | Skip -> ()
    | Print e -> check_exp e
    | Decl (t, s, e) -> failwith "Unimplemented"
    | If (b, c1, c2) -> failwith "Unimplemented"

let rec check_comm_lst (cl : comm list) : unit = 
    match cl with
    | [] -> ()
    | h::t -> check_comm h; check_comm_lst t

let rec check_tags (t : tagdecl list) : unit =
    match t with 
    | [] -> ()
    | TagDecl(s, a)::t -> failwith "Unimplemented"

let check_prog (e : prog) : unit =
    match e with
    | Prog (t, c) -> check_tags t; check_comm_lst c
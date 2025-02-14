import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Product from "@/models/Product"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""
  const category = searchParams.get("category") || ""
  const minPrice = Number(searchParams.get("minPrice")) || 0
  const maxPrice = Number(searchParams.get("maxPrice")) || Number.POSITIVE_INFINITY
  const sortBy = searchParams.get("sortBy") || "name"
  const sortOrder = searchParams.get("sortOrder") || "asc"

  try {
    await dbConnect()

    const filter = {
      price: { $gte: minPrice, $lte: maxPrice },
    }

    if (query) {
      filter.$or = [{ name: { $regex: query, $options: "i" } }, { tags: { $in: [new RegExp(query, "i")] } }]
    }

    if (category) {
      filter.category = category
    }

    const products = await Product.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(50) // Limit to 50 products for performance

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

